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

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { LoaderFunctionArgs } from 'react-router';
import HomePage, { type HomePageData, loader } from './_app._index';
import { getConfig } from '@salesforce/storefront-next-runtime/config';
import type { AppConfig } from '@/types/config';

// Mock react-i18next
vi.mock('react-i18next', async () => {
    const actual: any = await vi.importActual('react-i18next');
    return {
        ...actual,
        useTranslation: () => ({
            t: (key: string, fallback?: any) => {
                if (typeof fallback === 'string') return fallback;
                if (fallback && typeof fallback === 'object' && 'defaultValue' in fallback) {
                    return fallback.defaultValue ?? key;
                }
                return key;
            },
            i18n: { language: 'en-GB', changeLanguage: vi.fn() },
        }),
    };
});

// Mock decorators
vi.mock('@/lib/decorators/page-type', () => ({
    PageType: () => (target: any) => target,
}));
vi.mock('@/lib/decorators/region-definition', () => ({
    RegionDefinition: () => (target: any) => target,
    getRegionDefinition: vi.fn(),
}));

// Mock SeoMeta
vi.mock('@/components/seo-meta', () => ({
    SeoMeta: () => null,
}));

// Mock Dyson home components (all lazy-loaded)
vi.mock('@/components/home/dyson-hero', () => ({
    default: () => <div data-testid="dyson-hero">DysonHero</div>,
}));
vi.mock('@/components/home/statement-band', () => ({
    default: () => <div data-testid="statement-band">StatementBand</div>,
}));
vi.mock('@/components/home/goal-carousel', () => ({
    default: () => <div data-testid="goal-carousel">GoalCarousel</div>,
}));
vi.mock('@/components/home/proof-band', () => ({
    default: () => <div data-testid="proof-band">ProofBand</div>,
}));
vi.mock('@/components/home/hotspot-diagram', () => ({
    default: () => <div data-testid="hotspot-diagram">HotspotDiagram</div>,
}));
vi.mock('@/components/home/real-homes', () => ({
    default: () => <div data-testid="real-homes">RealHomes</div>,
}));
vi.mock('@/components/home/care-cta', () => ({
    default: () => <div data-testid="care-cta">CareCta</div>,
}));

vi.mock('@/lib/logger.server', () => ({
    getLogger: vi.fn(() => ({
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    })),
}));

vi.mock('@salesforce/storefront-next-runtime/config', async (importOriginal) => {
    const actual = await importOriginal<object>();
    return { ...actual, getConfig: vi.fn() };
});

vi.mock('@salesforce/storefront-next-runtime/site-context', async (importOriginal) => {
    const actual = await importOriginal<object>();
    return {
        ...actual,
        siteContext: 'siteContext',
        resolvePrefix: vi.fn().mockReturnValue('/en-GB'),
    };
});

vi.mock('@/utils/canonical-url', () => ({
    buildCanonicalUrl: vi.fn(() => 'http://localhost/en-GB/'),
}));

const defaultLoaderData: HomePageData = {
    pageUrl: 'http://localhost/en-GB/',
    currency: 'GBP',
};

const renderComponent = (overrides?: Partial<HomePageData>) =>
    render(<HomePage loaderData={{ ...defaultLoaderData, ...overrides }} />);

const createMockContext = () => ({
    get: vi.fn(() => ({ currency: 'GBP' })),
    set: vi.fn(),
});

const mockConfig = {
    url: { prefix: '/:siteId/:localeId' },
    defaultSiteId: 'dysonuk',
    siteAliasMap: { dysonuk: 'uk' },
    localeAliasMap: { 'en-GB': 'en-gb' },
    commerce: { sites: [{ id: 'dysonuk', defaultLocale: 'en-GB' }] },
    i18n: { fallbackLng: 'en-GB' },
} as unknown as AppConfig;

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getConfig).mockReturnValue(mockConfig);
    });

    test('renders DysonHero', () => {
        renderComponent();
        expect(screen.getByTestId('dyson-hero')).toBeDefined();
    });

    test('renders StatementBand', () => {
        renderComponent();
        expect(screen.getByTestId('statement-band')).toBeDefined();
    });
});

describe('HomePage loader', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(getConfig).mockReturnValue(mockConfig);
    });

    test('returns pageUrl and currency', async () => {
        const context = createMockContext();
        const args = {
            context,
            request: new Request('http://localhost/en-GB/'),
            params: {},
        } as unknown as LoaderFunctionArgs;

        const result = await loader(args as any);
        expect(result.pageUrl).toBe('http://localhost/en-GB/');
        expect(result.currency).toBe('GBP');
    });

    test('redirects bare "/" to default site/locale prefix', async () => {
        const context = createMockContext();
        const args = {
            context,
            request: new Request('http://localhost/'),
            params: {},
        } as unknown as LoaderFunctionArgs;

        await expect(loader(args as any)).rejects.toBeDefined();
    });
});
