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
import { lazy, Suspense } from 'react';
import { redirect } from 'react-router';
import type { Route } from './+types/_app._index';
import { siteContext, resolvePrefix, type SiteContext } from '@salesforce/storefront-next-runtime/site-context';
import { getConfig } from '@salesforce/storefront-next-runtime/config';
import { getLogger } from '@/lib/logger.server';
import { PageType } from '@/lib/decorators/page-type';
import { RegionDefinition } from '@/lib/decorators/region-definition';
import { SeoMeta } from '@/components/seo-meta';
import { buildCanonicalUrl } from '@/utils/canonical-url';
import { useTranslation } from 'react-i18next';
import DysonHero from '@/components/home/dyson-hero';
import StatementBand from '@/components/home/statement-band';

export { shouldRevalidate } from '@/lib/revalidation/routes/home';

export const handle = {
    transparentHeader: true,
    ui: { header: { transparentOnLoad: true } },
};

const GoalCarousel = lazy(() => import('@/components/home/goal-carousel'));
const ProofBand = lazy(() => import('@/components/home/proof-band'));
const HotspotDiagram = lazy(() => import('@/components/home/hotspot-diagram'));
const RealHomes = lazy(() => import('@/components/home/real-homes'));
const CareCta = lazy(() => import('@/components/home/care-cta'));

@PageType({
    name: 'Home Page',
    description: 'Dyson storefront home page',
    supportedAspectTypes: [],
})
@RegionDefinition([
    {
        id: 'headerbanner',
        name: 'Header Banner Region',
        description: 'Region for promotional banners and hero content',
        maxComponents: 3,
    },
    {
        id: 'main',
        name: 'Main Content Region',
        description: 'Region for main content',
        maxComponents: 10,
    },
])
export class HomePageMetadata {}

export type HomePageData = {
    pageUrl: string;
    currency: string | null;
};

export async function loader(args: Route.LoaderArgs): Promise<HomePageData> {
    const logger = getLogger(args.context);
    logger.debug('HomePage: loader starting');

    const config = getConfig(args.context);
    const requestUrl = new URL(args.request.url);

    if (requestUrl.pathname === '/' && config.url?.prefix && config.url.prefix !== '/') {
        const siteRef = config.siteAliasMap?.[config.defaultSiteId] ?? config.defaultSiteId;
        const defaultSite = config.commerce.sites.find((s) => s.id === config.defaultSiteId);
        const defaultLocale = defaultSite?.defaultLocale ?? config.i18n.fallbackLng;
        const localeRef = config.localeAliasMap?.[defaultLocale] ?? defaultLocale;
        const prefixedPath = resolvePrefix({
            prefix: config.url.prefix,
            params: { siteId: siteRef, localeId: localeRef },
        });
        throw redirect(`${prefixedPath}/`);
    }

    const currency = (args.context.get(siteContext) as SiteContext).currency;
    const pageUrl = buildCanonicalUrl(requestUrl.origin, requestUrl.pathname, requestUrl.search);

    return { pageUrl, currency };
}

export default function HomePage({ loaderData }: { loaderData: HomePageData }) {
    const { t } = useTranslation('home');

    return (
        <>
            <SeoMeta
                rawTitle
                title={t('meta.title', { defaultValue: 'Dyson | Engineered to clean deeper' })}
                description={t('meta.description', {
                    defaultValue: "Dyson's most powerful cordless vacuum. Laser-guided. Self-cleaning. Shop the V12s Detect Slim Submarine.",
                })}
                openGraph={{
                    type: 'website',
                    url: loaderData.pageUrl,
                }}
            />

            {/* Section 1: Full-bleed hero — no top padding (hero bleed) */}
            <DysonHero />

            {/* Section 2: Statement — centred serif headline */}
            <StatementBand />

            {/* Section 3: Goal-first carousel — lazy, below fold */}
            <Suspense fallback={<div className="h-[520px] bg-background" />}>
                <GoalCarousel />
            </Suspense>

            {/* Section 4: Proof band — dark stats */}
            <Suspense fallback={<div className="h-64 bg-dark-band" />}>
                <ProofBand />
            </Suspense>

            {/* Section 5: Engineering hotspot diagram */}
            <Suspense fallback={<div className="h-96 bg-panel" />}>
                <HotspotDiagram />
            </Suspense>

            {/* Section 6: Real homes testimonials */}
            <Suspense fallback={<div className="h-80 bg-background" />}>
                <RealHomes />
            </Suspense>

            {/* Section 7: Care CTAs */}
            <Suspense fallback={<div className="h-64 bg-muted/30" />}>
                <CareCta />
            </Suspense>
        </>
    );
}
