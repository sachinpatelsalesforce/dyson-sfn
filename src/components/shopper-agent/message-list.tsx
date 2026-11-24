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
import { useEffect, useRef } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { Link } from '@/components/link';
import type { Message } from './use-conversation';
import { ProductCarousel } from './product-carousel';
import { ProductDetailCard } from './product-detail-card';

type Props = {
    messages: Message[];
    isTyping: boolean;
    onDetail: (sku: string) => void;
    onAddedToCart: (productName: string) => void;
};

export function MessageList({ messages, isTyping, onDetail, onAddedToCart }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, isTyping]);

    return (
        <div className="flex flex-col gap-3">
            {messages.map((msg, i) => {
                if (msg.role === 'detail') {
                    return (
                        <div key={i}>
                            <ProductDetailCard sku={msg.sku} onAddedToCart={onAddedToCart} />
                        </div>
                    );
                }

                if (msg.role === 'cart-added') {
                    return (
                        <div key={i} className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-3 py-2.5">
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                                <Check className="size-3.5 text-green-600" />
                            </div>
                            <p className="flex-1 text-xs text-green-800">
                                <span className="font-semibold">{msg.productName}</span> added to your basket
                            </p>
                            <Link
                                to="/cart"
                                className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-green-700 underline-offset-2 hover:underline"
                            >
                                <ShoppingCart className="size-3" />
                                View basket
                            </Link>
                        </div>
                    );
                }

                return (
                    <div key={i}>
                        <div className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                            {msg.role === 'agent' ? (
                                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-gray-100 px-3.5 py-2.5 text-sm leading-relaxed text-gray-900 whitespace-pre-line">
                                    {msg.text}
                                </div>
                            ) : (
                                <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#1a1a1a] px-3.5 py-2.5 text-sm leading-relaxed text-white">
                                    {msg.text}
                                </div>
                            )}
                        </div>
                        {msg.role === 'agent' && msg.productSkus && msg.productSkus.length > 0 && (
                            <ProductCarousel skus={msg.productSkus} onDetail={onDetail} onAddedToCart={onAddedToCart} />
                        )}
                    </div>
                );
            })}
            {isTyping && (
                <div className="flex flex-col gap-2 px-0.5 py-1">
                    <div className="h-2.5 w-[72%] rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-2.5 w-[88%] rounded-full bg-gray-200 animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="h-2.5 w-[52%] rounded-full bg-gray-200 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
