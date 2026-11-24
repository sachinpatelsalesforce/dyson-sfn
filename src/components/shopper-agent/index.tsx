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
import { lazy, Suspense, useState } from 'react';

const ShopperAgentPanel = lazy(() =>
    import('./shopper-agent').then((m) => ({ default: m.ShopperAgent }))
);

export function ShopperAgent() {
    const [mounted, setMounted] = useState(false);

    return (
        <>
            {/* Trigger button — always present so users can open the agent */}
            {!mounted && (
                <button
                    onClick={() => setMounted(true)}
                    aria-label="Ask Dyson"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#1a1a1a] px-4 py-3 text-white shadow-xl transition-all duration-200 hover:bg-black hover:scale-105"
                >
                    <svg
                        className="size-4 text-white/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    <span className="text-sm font-semibold tracking-wide">Ask Dyson</span>
                </button>
            )}

            {/* Lazy-mount the full panel only after first click */}
            {mounted && (
                <Suspense fallback={null}>
                    <ShopperAgentPanel />
                </Suspense>
            )}
        </>
    );
}
