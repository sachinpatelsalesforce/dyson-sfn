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
import { useState, useEffect, type ReactElement } from 'react';
import type { ShopperProducts } from '@/scapi';
import { useProductView } from '@/providers/product-view';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface StickyAtcBarProps {
    product: ShopperProducts.schemas['Product'];
}

/**
 * Minimal floating add-to-cart bar — Oura-style.
 * Appears once the buy panel (#pdp-buy-panel) scrolls out of view.
 */
export default function StickyAtcBar({ product }: StickyAtcBarProps): ReactElement | null {
    const { t } = useTranslation('product');
    const { handleAddToCart, isAddingToOrUpdatingCart, canAddToCart } = useProductView();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = document.getElementById('pdp-buy-panel');
        if (!target) return;

        const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 });
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                'fixed bottom-0 left-0 right-0 z-50',
                'bg-card/95 backdrop-blur-sm border-t border-muted',
                'transition-transform duration-300',
                visible ? 'translate-y-0' : 'translate-y-full'
            )}>
            <div className="section-container flex items-center gap-4 py-3">
                <p className="flex-1 min-w-0 text-sm font-medium truncate">{product.name}</p>
                <Button
                    size="lg"
                    disabled={!canAddToCart || isAddingToOrUpdatingCart}
                    onClick={() => void handleAddToCart()}
                    className="shrink-0">
                    {isAddingToOrUpdatingCart ? t('addingToCart', 'Adding…') : t('addToCart', 'Add to Cart')}
                </Button>
            </div>
        </div>
    );
}
