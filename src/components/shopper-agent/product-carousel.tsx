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
import { useFetcher } from 'react-router';
import { getProducts } from './dyson-catalog';
import type { CatalogProduct } from './dyson-catalog';

type ProductCardProps = {
    product: CatalogProduct;
    onDetail: (sku: string) => void;
    onAddedToCart: (productName: string) => void;
};

function ProductCard({ product, onDetail, onAddedToCart }: ProductCardProps) {
    const fetcher = useFetcher();
    const isAdding = fetcher.state !== 'idle';
    const added = fetcher.data != null && (fetcher.data as { success?: boolean }).success === true;
    const prevStateRef = useRef(fetcher.state);

    useEffect(() => {
        if (
            prevStateRef.current === 'submitting' &&
            fetcher.state === 'idle' &&
            (fetcher.data as { success?: boolean } | null)?.success
        ) {
            onAddedToCart(product.name);
        }
        prevStateRef.current = fetcher.state;
    }, [fetcher.state, fetcher.data, product.name, onAddedToCart]);

    return (
        <div className="flex w-[145px] shrink-0 flex-col rounded-xl border border-border bg-white overflow-hidden">
            <button
                type="button"
                onClick={() => onDetail(product.sku)}
                className="flex h-[120px] items-center justify-center bg-[#f7f7f7] p-2 hover:bg-gray-100 transition-colors"
                aria-label={`See details for ${product.name}`}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </button>

            <div className="flex flex-col gap-1.5 p-2.5">
                <button
                    type="button"
                    onClick={() => onDetail(product.sku)}
                    className="text-left"
                >
                    <p className="line-clamp-2 text-[11px] font-medium leading-tight text-gray-900 hover:underline">
                        {product.name}
                    </p>
                </button>
                <p className="text-xs font-semibold text-gray-900">
                    £{product.price.toFixed(2)}
                </p>

                <fetcher.Form method="post" action="/action/cart-item-add">
                    <input
                        type="hidden"
                        name="productItem"
                        value={JSON.stringify({ productId: product.sku, quantity: 1 })}
                    />
                    <button
                        type="submit"
                        disabled={isAdding || added}
                        className="mt-0.5 w-full rounded-lg bg-[#1a1a1a] px-2 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-black disabled:opacity-60"
                    >
                        {added ? 'Added ✓' : isAdding ? 'Adding…' : 'Add to cart'}
                    </button>
                </fetcher.Form>
            </div>
        </div>
    );
}

type Props = {
    skus: string[];
    onDetail: (sku: string) => void;
    onAddedToCart: (productName: string) => void;
};

export function ProductCarousel({ skus, onDetail, onAddedToCart }: Props) {
    const products = getProducts(skus);
    if (!products.length) return null;

    return (
        <div className="mt-2 -mx-4 px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {products.map((p) => (
                    <ProductCard key={p.sku} product={p} onDetail={onDetail} onAddedToCart={onAddedToCart} />
                ))}
            </div>
        </div>
    );
}
