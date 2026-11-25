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
import React, { lazy, Suspense, type ReactElement } from 'react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import type { ShopperProducts } from '@/scapi';
import ImageGallery from '@/components/image-gallery';
import ProductInfo from '@/components/product-view/product-info';
import ProductCartActions from '@/components/product-cart-actions';
import ProductViewProvider, { useOptionalProductView } from '@/providers/product-view';
import { useProductImages } from '@/hooks/product/use-product-images';
import { useSelectedVariations } from '@/hooks/product/use-selected-variations';
import { isProductSet, isProductBundle } from '@/lib/product/product-utils';
import { uiConfig } from '@/lib/config.ui';
import { usesInlineAddToCartQuantity } from '@/lib/product/add-to-cart-quantity-mode';
import CollapsibleHtmlSection from '@/components/collapsible-section/collapsible-html-section';
import { useTranslation } from 'react-i18next';
import { UITarget } from '@/targets/ui-target';
import KeyFeatureStrip from '@/components/product-view/key-feature-strip';
import SpecTiles from '@/components/product-view/spec-tiles';
import TechSpecsPanel from '@/components/product-view/tech-specs-panel';
import BrandPromiseStrip from '@/components/product-view/brand-promise-strip';
import OptionCards from '@/components/product-view/option-cards';
import ProductFaq from '@/components/product-view/product-faq';

const StickyAtcBar = lazy(() => import('@/components/product-view/sticky-atc-bar'));

interface ProductViewProps {
    product: ShopperProducts.schemas['Product'];
    mode?: 'add' | 'edit';
}

/** Inline trust badges rendered immediately after the ATC button. */
function TrustRow(): ReactElement {
    const { t } = useTranslation('product');
    const items = [
        { Icon: ShieldCheck, label: t('dyson.promise.warranty') },
        { Icon: Truck, label: t('dyson.promise.delivery') },
        { Icon: RotateCcw, label: t('dyson.promise.returns') },
    ] as const;
    return (
        <ul className="mt-4 flex flex-col gap-1.5" aria-label="Dyson Promise">
            {items.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="size-3.5 text-primary shrink-0" aria-hidden="true" />
                    {label}
                </li>
            ))}
        </ul>
    );
}

/**
 * ProductView component renders a complete product detail view with image gallery and product information.
 *
 * @param props - The component props
 * @param props.product - The product data from Salesforce Commerce Cloud containing all product details,
 *                        variants, pricing, and metadata
 *
 * @returns A React element containing the complete product view layout
 *
 * @example
 * ```tsx
 * <ProductView product={productData} />
 * ```
 */
export default function ProductView({ product, mode = 'add' }: ProductViewProps): ReactElement {
    const productView = useOptionalProductView();
    const isProductASet = isProductSet(product);
    const isProductABundle = isProductBundle(product);
    const selectedAttributes = useSelectedVariations({ product });
    const { galleryImages } = useProductImages({ product, selectedAttributes });
    const { t } = useTranslation('product');
    // Furniture opts into the mosaic PDP gallery via config; every other vertical stays stacked.
    const galleryLayout = uiConfig.pages.product.galleryLayout ?? 'stacked';
    const useInlineCartQuantity =
        (productView?.mode ?? mode) === 'add' && !isProductASet && !isProductABundle && usesInlineAddToCartQuantity();

    const content = (
        // React.Fragment (not <>) is required: the storefront-next-dev UITarget
        // Babel transform's VariableDeclaration handler only traverses when the
        // init value is a JSXElement; a JSXFragment (<>) silently skips the
        // traversal, leaving <UITarget/> unreplaced while stripping its import.
        <React.Fragment>
            {/* Hero grid — 60/40 split on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 lg:gap-12">
                <div className="order-1">
                    <ImageGallery
                        key={product.id}
                        images={galleryImages}
                        eager={!isProductASet && !isProductABundle}
                        showNavigationArrows
                        navigationArrowSize="lg"
                        productName={product.name}
                        layout={galleryLayout}
                    />
                    <UITarget targetId="sfcc.pdp.agent.productHelper" />
                    {product.longDescription && product.longDescription !== product.shortDescription && (
                        <CollapsibleHtmlSection
                            label={`${t('description')}:`}
                            content={product.longDescription}
                            contentType="bulleted-list"
                            defaultOpen
                            className="mt-6"
                        />
                    )}
                </div>

                <div className="order-2 lg:sticky lg:top-20 lg:self-start">
                    <ProductInfo
                        product={product}
                        showQuantityPicker={!useInlineCartQuantity}
                        // @sfdc-extension-block-start SFDC_EXT_BOPIS
                        // @sfdc-extension-line SFDC_EXT_SHIPPING_DELIVERY
                        enableDeliveryEstimatePresentation
                        // @sfdc-extension-block-end SFDC_EXT_BOPIS
                    />
                    <OptionCards />
                    <div
                        id="pdp-buy-panel"
                        className="mt-6 rounded-2xl bg-panel p-6 [&_[data-testid='express-payments']]:hidden">
                        <ProductCartActions product={product} showInlineCartQuantity={useInlineCartQuantity} />
                        <TrustRow />
                        <UITarget targetId="sfcc.pdp.returnsWarranty" />
                        {/* DEMO: Finance line */}
                        <p className="mt-3 text-xs text-muted-foreground">
                            {t('dyson.financing', 'From £X/month with 0% APR. DEMO only.')}
                        </p>
                    </div>
                    <UITarget targetId="sfcc.pdp.collapsibles" />
                </div>
            </div>

            {/* Below-fold enrichment sections */}
            <KeyFeatureStrip product={product} />
            <SpecTiles product={product} />
            <TechSpecsPanel product={product} imageUrl={galleryImages[0]?.src ?? undefined} />
            <BrandPromiseStrip />
            <section className="section-container py-16">
                <ProductFaq />
            </section>
        </React.Fragment>
    );

    if (productView)
        return (
            <>
                {content}
                <Suspense fallback={null}>
                    <StickyAtcBar product={product} />
                </Suspense>
            </>
        );

    return (
        <ProductViewProvider product={product} mode={mode}>
            {content}
            <Suspense fallback={null}>
                <StickyAtcBar product={product} />
            </Suspense>
        </ProductViewProvider>
    );
}
