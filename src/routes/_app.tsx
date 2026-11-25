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
import { useRef } from 'react';
import { Outlet, useMatches } from 'react-router';
import { LenisProvider } from '@/providers/lenis';
import type { Route } from './+types/_app';
import { usePageUIConfig, mainPaddingDataAttributes } from '@/lib/routes/page-ui-config';
import { getConfig } from '@salesforce/storefront-next-runtime/config';
import { type ShopperProducts } from '@/scapi';
import { fetchCategory } from '@/lib/api/categories.server';
import { getLogger } from '@/lib/logger.server';
import Header from '@/components/header';
import Footer from '@/components/footer';
import DysonNav from '@/components/dyson-nav';
import { ShopperAgent } from '@/components/shopper-agent';
import { WishlistMergeToast } from '@/components/wishlist/wishlist-merge-toast';
import { useAuth } from '@/providers/auth';
import { useWishlistSession } from '@/providers/wishlist';
import { EmbeddedComponentRegion } from '@/components/region/embedded-component-region';
import { SkipLink } from '@/components/skip-link';
import {
    fetchComponentWithComponentData,
    type ComponentWithComponentData,
} from '@/lib/page-designer/component-loader.server';

type LoaderData = {
    root: Promise<ShopperProducts.schemas['Category']>;
    headerComponent: Promise<ComponentWithComponentData | null>;
};

const NAVIGATION_FIELDS_SELECT_ROOT = ['id', 'name', 'slug', 'onlineSubCategoriesCount'].join(',');

/**
 * We're using the `shouldRevalidate` functionality to only load the navigation menu categories from the server on the
 * very first navigation to a page using the (default) `_app` layout. This behavior ensures that the initial data
 * doesn't get overwritten/removed on subsequent client-side navigations.
 * @see {@link https://reactrouter.com/start/framework/route-module#shouldrevalidate}
 */
export function shouldRevalidate() {
    return false;
}

export function loader({ context, request }: Route.LoaderArgs): LoaderData {
    const logger = getLogger(context);
    const config = getConfig(context);
    const { rootCategoryId } = config.pages.navigation;

    logger.debug('AppLayout: loader starting', { rootCategoryId });

    const rootCategoryPromise = fetchCategory(context, rootCategoryId, 1, {
        select: NAVIGATION_FIELDS_SELECT_ROOT,
        personalized: 'none',
    }).catch((error: unknown) => {
        logger.error('AppLayout: root navigation fetch failed', { error, rootCategoryId });
        return { id: rootCategoryId, categories: [] };
    });

    const fetchEmbeddedComponent = (componentId: string) =>
        fetchComponentWithComponentData({ context, request, params: {} } as Route.LoaderArgs, { componentId }).catch(
            (error: unknown) => {
                logger.warn('AppLayout: embedded component fetch failed', { componentId, error });
                return null;
            }
        );

    // Fetch header embedded component data. The announcement renders above all page content in a critical region,
    // which suspends the shell until this resolves: a banner streamed in later would push the page down.
    const headerComponentPromise = fetchEmbeddedComponent('header');

    return {
        root: rootCategoryPromise,
        headerComponent: headerComponentPromise,
    };
}

/**
 * Default Layout Route
 *
 * This pathless layout route provides the standard storefront UI structure:
 * - Header with navigation
 * - Main content area (via `<Outlet/>`)
 * - Footer
 *
 * Routes that need this layout should be prefixed with `_app.` in their filename.
 * For routes without default header/footer (e.g., login), use the `_empty.` prefix instead.
 */
export default function DefaultLayout({ loaderData: { root, headerComponent } }: { loaderData: LoaderData }) {
    const refRoot = useRef<Promise<ShopperProducts.schemas['Category']> | undefined>(undefined);
    const refHeaderComponent = useRef<Promise<ComponentWithComponentData | null> | undefined>(undefined);
    if (!refRoot.current && !refHeaderComponent.current) {
        refRoot.current = root;
        refHeaderComponent.current = headerComponent;
    }

    // Reflect the route's `handle.ui` config onto <main> as data-* attributes
    // during render, so the correct top padding is present in the SSR'd HTML.
    const mainPaddingAttrs = mainPaddingDataAttributes(usePageUIConfig());

    useWishlistSession(useAuth()?.customerId ?? null);

    // Check if the current route opts in to a transparent hero header
    const matches = useMatches();
    const heroTransparent = matches.some(
        (m) => (m.handle as { transparentHeader?: boolean } | undefined)?.transparentHeader === true
    );

    return (
        <>
            <LenisProvider>
                <SkipLink />
                <WishlistMergeToast />
                <Header
                    heroTransparent={heroTransparent}
                    announcementSlot={
                        // Keep this region outside any Suspense boundary, so it blocks the shell until it resolves.
                        <EmbeddedComponentRegion
                            component={refHeaderComponent.current}
                            regionId="announcement"
                            critical
                        />
                    }>
                    <DysonNav categoriesPromise={refRoot.current ?? root} />
                </Header>
                <main id="main-content" tabIndex={-1} className="grow pt-8" {...mainPaddingAttrs}>
                    <Outlet />
                </main>
                <Footer />
            </LenisProvider>
            <ShopperAgent />
        </>
    );
}
