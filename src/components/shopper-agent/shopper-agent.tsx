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
/* oxlint-disable custom/color-linter -- Dyson agent panel: explicit colors required (dark theme, CSS token vars resolve dark) */
import { useState, useRef } from 'react';
import { X, ArrowUp, Sparkles, RotateCcw } from 'lucide-react';
import heroImage from '/images/dyson-hero-v12s.jpg';
import { cn } from '@/lib/utils';
import { useConversation } from './use-conversation';
import { MessageList } from './message-list';
import { QuickReplies } from './quick-replies';

export function ShopperAgent() {
    const [open, setOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const { messages, chips, isTyping, cartCount, selectChip, showDetail, notifyCartAdded, submitText, reset } =
        useConversation();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        submitText(inputValue);
        setInputValue('');
    }

    function handleReset() {
        reset();
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            {/* Toggle button — shown when panel is closed */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Ask Dyson"
                className={cn(
                    'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-white transition-all duration-300 hover:scale-105 hover:brightness-110',
                    'bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#06b6d4]',
                    open && 'opacity-0 pointer-events-none scale-90'
                )}
                style={{
                    boxShadow:
                        '0 0 24px rgba(124,58,237,0.6), 0 0 48px rgba(6,182,212,0.2), 0 4px 16px rgba(0,0,0,0.4)',
                }}>
                <Sparkles className="size-4 animate-pulse text-white/90" />
                <span className="text-sm font-semibold tracking-wide">Ask Dyson</span>
                {cartCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-purple-700">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Backdrop — decorative overlay; keyboard users close via the Close button in the panel header */}
            <div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className={cn(
                    'fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300',
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}
            />

            {/* Panel */}
            <div
                className={cn(
                    'fixed right-0 top-0 z-50 flex h-screen w-[390px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out',
                    open ? 'translate-x-0' : 'translate-x-full'
                )}
                aria-modal="true"
                aria-label="Ask Dyson shopping assistant">
                {/* Header */}
                <div className="flex items-center justify-between bg-gradient-to-r from-[#6a0dad] to-[#9b30d9] px-4 py-3 shrink-0">
                    <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-white/60" />
                        <span className="text-sm font-bold tracking-[0.12em] text-white uppercase">Ask Dyson</span>
                        <span className="text-white/40 text-xs">✦</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleReset}
                            aria-label="Restart conversation"
                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                            <RotateCcw className="size-3" />
                            Restart
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close chat"
                            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                            <X className="size-3.5" />
                            Close chat
                        </button>
                    </div>
                </div>

                {/* Hero banner */}
                <div className="relative shrink-0 overflow-hidden bg-[#1a1a1a]" style={{ height: 90 }}>
                    <img
                        src={heroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
                    />
                    <div className="relative z-10 flex h-full items-center px-4">
                        <p className="text-sm font-semibold leading-snug text-white">
                            Discover smarter solutions
                            <br />
                            for every home.
                        </p>
                    </div>
                </div>

                {/* Conversation */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
                    <MessageList
                        messages={messages}
                        isTyping={isTyping}
                        onDetail={showDetail}
                        onAddedToCart={notifyCartAdded}
                    />
                    {!isTyping && <QuickReplies chips={chips} onSelect={selectChip} />}
                </div>

                {/* Input bar */}
                <div className="shrink-0 border-t border-gray-200 px-3 py-3">
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="I'm looking for…"
                            className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                        />
                        <button
                            type="submit"
                            aria-label="Send"
                            disabled={!inputValue.trim()}
                            className="flex size-7 items-center justify-center rounded-full bg-gradient-to-r from-[#6a0dad] to-[#9b30d9] text-white transition-all hover:brightness-110 disabled:opacity-30">
                            <ArrowUp className="size-3.5" />
                        </button>
                    </form>
                    <p className="mt-2 text-center text-[10px] text-gray-400">
                        This assistant is here to help you shop. See our{' '}
                        <span className="underline cursor-pointer">privacy policy</span> for more information.
                    </p>
                </div>
            </div>
        </>
    );
}
