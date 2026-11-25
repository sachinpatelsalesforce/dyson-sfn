/**
 * Copyright 2026 Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useState, useCallback, useMemo } from 'react';
import { SCRIPT, WELCOME_NODE_ID, matchKeywords } from './dyson-script';

export type Message =
    | { role: 'agent'; text: string; productSkus?: string[] }
    | { role: 'user'; text: string }
    | { role: 'detail'; sku: string }
    | { role: 'cart-added'; productName: string };

function agentMessages(nodeId: string): Message[] {
    const node = SCRIPT[nodeId];
    if (!node) return [];
    return node.messages.map((text, i) => ({
        role: 'agent' as const,
        text,
        productSkus: i === node.messages.length - 1 ? node.productSkus : undefined,
    }));
}

const TYPING_DELAY_MS = 2200;

export function useConversation() {
    const [messages, setMessages] = useState<Message[]>(() => agentMessages(WELCOME_NODE_ID));
    const [currentNodeId, setCurrentNodeId] = useState(WELCOME_NODE_ID);
    const [isTyping, setIsTyping] = useState(false);
    const [visitedNodeIds, setVisitedNodeIds] = useState<Set<string>>(() => new Set([WELCOME_NODE_ID]));

    const currentNode = SCRIPT[currentNodeId];

    // Filter out chips that lead to already-visited nodes (keep "Start over" / welcome always)
    const chips = useMemo(
        () =>
            (currentNode?.chips ?? []).filter(
                (chip) => chip.nextId === WELCOME_NODE_ID || !visitedNodeIds.has(chip.nextId)
            ),
        [currentNode, visitedNodeIds]
    );

    const cartCount = useMemo(() => messages.filter((m) => m.role === 'cart-added').length, [messages]);

    const selectChip = useCallback((label: string, nextId: string) => {
        const nextNode = SCRIPT[nextId];
        if (!nextNode) return;
        setMessages((prev) => [...prev, { role: 'user', text: label }]);
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [...prev, ...agentMessages(nextId)]);
            setCurrentNodeId(nextId);
            setVisitedNodeIds((prev) => new Set([...prev, nextId]));
            setIsTyping(false);
        }, TYPING_DELAY_MS);
    }, []);

    const showDetail = useCallback((sku: string) => {
        setMessages((prev) => [...prev, { role: 'detail', sku }]);
    }, []);

    const notifyCartAdded = useCallback((productName: string) => {
        setMessages((prev) => [...prev, { role: 'cart-added', productName }]);
    }, []);

    const submitText = useCallback((text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
        setIsTyping(true);
        const matchedId = matchKeywords(trimmed);
        setTimeout(() => {
            if (matchedId) {
                setMessages((prev) => [...prev, ...agentMessages(matchedId)]);
                setCurrentNodeId(matchedId);
                setVisitedNodeIds((prev) => new Set([...prev, matchedId]));
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'agent',
                        text: "I'm not sure about that — here's what I can help you with:",
                        productSkus: undefined,
                    },
                    ...agentMessages(WELCOME_NODE_ID),
                ]);
                setCurrentNodeId(WELCOME_NODE_ID);
            }
            setIsTyping(false);
        }, TYPING_DELAY_MS);
    }, []);

    const reset = useCallback(() => {
        setMessages(agentMessages(WELCOME_NODE_ID));
        setCurrentNodeId(WELCOME_NODE_ID);
        setIsTyping(false);
        setVisitedNodeIds(new Set([WELCOME_NODE_ID]));
    }, []);

    return { messages, chips, isTyping, cartCount, selectChip, showDetail, notifyCartAdded, submitText, reset };
}
