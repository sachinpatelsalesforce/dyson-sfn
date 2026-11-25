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
/* oxlint-disable custom/color-linter -- Dyson agent panel renders inside a dark theme; CSS token vars resolve dark, so explicit colors are required */
import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';
import { getProduct } from './dyson-catalog';
import { Link } from '@/components/link';

type Props = {
    sku: string;
    onAddedToCart: (productName: string) => void;
};

export function ProductDetailCard({ sku, onAddedToCart }: Props) {
    const product = getProduct(sku);
    const fetcher = useFetcher();
    const prevStateRef = useRef(fetcher.state);

    const isAdding = fetcher.state !== 'idle';
    const added = fetcher.data != null && (fetcher.data as { success?: boolean }).success === true;

    useEffect(() => {
        if (
            prevStateRef.current === 'submitting' &&
            fetcher.state === 'idle' &&
            (fetcher.data as { success?: boolean } | null)?.success
        ) {
            if (product) onAddedToCart(product.name);
        }
        prevStateRef.current = fetcher.state;
    }, [fetcher.state, fetcher.data, product, onAddedToCart]);

    if (!product) return null;

    return (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="flex h-48 items-center justify-center bg-[#f7f7f7] p-4">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div>
                    <p className="text-sm font-bold leading-snug text-gray-900">{product.name}</p>
                    <p className="mt-1 text-base font-semibold text-gray-900">£{product.price.toFixed(2)}</p>
                </div>

                <ul className="flex flex-col gap-1">
                    {product.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
                            <span className="mt-0.5 shrink-0 text-[10px] text-gray-400">•</span>
                            {b}
                        </li>
                    ))}
                </ul>

                {product.variants.length > 0 && (
                    <div>
                        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                            Available options
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {product.variants.map((v) => (
                                <span
                                    key={v.sku}
                                    className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-gray-700">
                                    {v.name} — £{v.price.toFixed(2)}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-2 pt-1">
                    <Link
                        to={`/p/${product.slug}`}
                        className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                        See full details
                    </Link>

                    <fetcher.Form method="post" action="/action/cart-item-add">
                        <input
                            type="hidden"
                            name="productItem"
                            value={JSON.stringify({ productId: product.sku, quantity: 1 })}
                        />
                        <button
                            type="submit"
                            disabled={isAdding || added}
                            className="w-full rounded-lg bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black disabled:opacity-60">
                            {added ? 'Added to cart ✓' : isAdding ? 'Adding…' : 'Add to cart'}
                        </button>
                    </fetcher.Form>
                </div>
            </div>
        </div>
    );
}
