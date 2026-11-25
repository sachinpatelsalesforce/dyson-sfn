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
import { type ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import type { ShopperProducts } from '@/scapi';
import DefaultLayout, { loader, shouldRevalidate } from './_app';
import { AllProvidersWrapper } from '@/test-utils/context-provider';

const NAVIGATION_FIELDS_SELECT_ROOT = 'id,name,slug,onlineSubCategoriesCount';

const { mockLogger, mockNavigationConfig } = vi.hoisted(() => ({
    mockLogger: {
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn(),
        debug: vi.fn(),
    },
    mockNavigationConfig: {
        rootCategoryId: 'root',
        maxDepth: 2,
        filter: {
            enabled: true,
            attribute: 'c_showInMenu',
            requireOnline: true,
        },
    },
}));

vi.mock('@/lib/api/categories.server', () => ({
    fetchCategory: vi.fn(),
}));

vi.mock('@/lib/page-designer/component-loader.server', () => ({
    fetchComponentWithComponentData: vi.fn().mockResolvedValue(null),
}));

vi.mock('@/components/region/embedded-component-region', () => ({
    EmbeddedComponentRegion: ({
        component,
        regionId,
        critical,
    }: {
        component: unknown;
        regionId: string;
        critical?: boolean;
    }) => (
        <div
            data-testid="embedded-component-region"
            data-region-id={regionId}
            data-has-component={component == null ? 'false' : 'true'}
            data-critical={critical ? 'true' : 'false'}
        />
    ),
}));

vi.mock('@/components/header', () => ({
    default: ({ children, announcementSlot }: { children?: ReactNode; announcementSlot?: ReactNode }) => (
        <header data-testid="header" data-has-announcement-slot={announcementSlot ? 'true' : 'false'}>
            {announcementSlot}
            {children}
        </header>
    ),
}));

vi.mock('@/components/footer', () => ({
    default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/dyson-nav', () => ({
    default: ({ categoriesPromise }: { categoriesPromise?: unknown }) => (
        <nav data-testid="dyson-nav" data-has-categories={!!categoriesPromise}>
            Dyson Navigation
        </nav>
    ),
}));

vi.mock('@/lib/logger.server', () => ({
    getLogger: vi.fn(() => mockLogger),
}));

vi.mock('@salesforce/storefront-next-runtime/config', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@salesforce/storefront-next-runtime/config')>();
    return {
        ...actual,
        getConfig: vi.fn(() => ({
            pages: {
                navigation: mockNavigationConfig,
            },
        })),
        useConfig: vi.fn(() => ({
            pages: {
                navigation: mockNavigationConfig,
            },
        })),
    };
});

describe('_app.tsx - Default Layout Route', () => {
    const mockCategory: ShopperProducts.schemas['Category'] = {
        id: 'root',
        name: 'Root Category',
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('rendering', () => {
        it('should render Header, main content area, and Footer', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            Component: () => <div data-testid="child-content">Child Route Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                expect(screen.getByTestId('header')).toBeInTheDocument();
                expect(screen.getByTestId('footer')).toBeInTheDocument();
                expect(screen.getByTestId('dyson-nav')).toBeInTheDocument();
                expect(screen.getByTestId('child-content')).toBeInTheDocument();
            });
        });

        it('renders the header announcement as a critical region', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                        headerComponent: Promise.resolve({ id: 'header-component' }),
                    }),
                    children: [{ index: true, Component: () => <div /> }],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            const region = await screen.findByTestId('embedded-component-region');
            expect(region).toHaveAttribute('data-region-id', 'announcement');
            expect(region).toHaveAttribute('data-has-component', 'true');
            expect(region).toHaveAttribute('data-critical', 'true');
        });

        it('should render main element with correct styling', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            Component: () => <div>Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                const main = screen.getByRole('main');
                expect(main).toBeInTheDocument();
                expect(main).toHaveClass('grow', 'pt-8');
                expect(main).toHaveAttribute('data-has-top-padding', 'false');
                expect(main).toHaveAttribute('data-hero-bleed', 'false');
            });
        });

        it('reflects handle.ui.main.hasTopPadding onto <main> at render (SSR, no post-hydration shift)', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            handle: { ui: { main: { hasTopPadding: true } } },
                            Component: () => <div>Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                const main = screen.getByRole('main');
                expect(main).toHaveAttribute('data-has-top-padding', 'true');
                expect(main).toHaveAttribute('data-hero-bleed', 'false');
            });
        });

        it('reflects handle.ui.header.transparentOnLoad onto <main> as data-hero-bleed at render', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            handle: { ui: { header: { transparentOnLoad: true } } },
                            Component: () => <div>Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                const main = screen.getByRole('main');
                expect(main).toHaveAttribute('data-hero-bleed', 'true');
                expect(main).toHaveAttribute('data-has-top-padding', 'false');
            });
        });

        it('should render DysonNav with categories promise', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            Component: () => <div>Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                const nav = screen.getByTestId('dyson-nav');
                expect(nav).toHaveAttribute('data-has-categories', 'true');
            });
        });

        it('should handle missing root loader data gracefully', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        // No root data
                    }),
                    children: [
                        {
                            index: true,
                            Component: () => <div data-testid="child-content">Content</div>,
                        },
                    ],
                },
            ]);

            render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                expect(screen.getByTestId('header')).toBeInTheDocument();
                expect(screen.getByTestId('footer')).toBeInTheDocument();
                expect(screen.getByTestId('child-content')).toBeInTheDocument();

                const nav = screen.getByTestId('dyson-nav');
                expect(nav).toHaveAttribute('data-has-categories', 'false');
            });
        });

        it('should preserve category refs across re-renders', async () => {
            const Stub = createRoutesStub([
                {
                    id: 'root',
                    path: '/',
                    Component: DefaultLayout,
                    loader: () => ({
                        root: Promise.resolve(mockCategory),
                    }),
                    children: [
                        {
                            index: true,
                            Component: () => <div>Content</div>,
                        },
                    ],
                },
            ]);

            const { rerender } = render(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );

            await waitFor(() => {
                expect(screen.getByTestId('dyson-nav')).toHaveAttribute('data-has-categories', 'true');
            });

            rerender(
                <AllProvidersWrapper>
                    <Stub initialEntries={['/']} />
                </AllProvidersWrapper>
            );
            await waitFor(() => {
                expect(screen.getByTestId('dyson-nav')).toHaveAttribute('data-has-categories', 'true');
            });
        });
    });

    describe('shouldRevalidate', () => {
        it('should always return false to prevent revalidation', () => {
            expect(shouldRevalidate()).toBe(false);
        });
    });

    describe('loader', () => {
        it('should load root category with level 1', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const mockFetchCategory = vi.mocked(fetchCategory);

            const mockRootCategory: ShopperProducts.schemas['Category'] = {
                id: 'root',
                name: 'Root',
                categories: [],
            };

            mockFetchCategory.mockResolvedValue(mockRootCategory);

            const mockContext = {} as any;
            const result = loader({ context: mockContext, request: new Request('https://example.test/') } as any);

            expect(mockFetchCategory).toHaveBeenCalledWith(mockContext, 'root', 1, {
                select: NAVIGATION_FIELDS_SELECT_ROOT,
                personalized: 'none',
            });
            expect(result).toHaveProperty('root');
            expect(result).toHaveProperty('headerComponent');
            expect(result).not.toHaveProperty('subs');
            expect(result).not.toHaveProperty('megaMenuComponent');

            const rootCategory = await result.root;
            expect(rootCategory).toEqual(mockRootCategory);
        });

        it('degrades to empty navigation when the root category request fails', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const navigationError = new Error('Shopper Products unavailable');
            vi.mocked(fetchCategory).mockRejectedValue(navigationError);

            const result = loader({
                context: {} as any,
                request: new Request('https://example.test/'),
            } as any);

            await expect(result.root).resolves.toEqual({ id: 'root', categories: [] });
            expect(mockLogger.error).toHaveBeenCalledWith('AppLayout: root navigation fetch failed', {
                error: navigationError,
                rootCategoryId: 'root',
            });
        });

        it('should fetch header embedded component data with componentId="header"', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const { fetchComponentWithComponentData } = await import('@/lib/page-designer/component-loader.server');
            const mockFetchCategory = vi.mocked(fetchCategory);
            const mockFetchComponent = vi.mocked(fetchComponentWithComponentData);

            mockFetchCategory.mockResolvedValue({ id: 'root', name: 'Root', categories: [] });
            mockFetchComponent.mockResolvedValue({ id: 'header-component' } as never);

            const mockContext = {} as any;
            const request = new Request('https://example.test/');
            const result = loader({ context: mockContext, request } as any);

            expect(mockFetchComponent).toHaveBeenCalledTimes(1);
            const headerCall = mockFetchComponent.mock.calls.find(([, options]) => options?.componentId === 'header');
            expect(headerCall).toBeDefined();
            expect(headerCall?.[0]).toMatchObject({ context: mockContext, request, params: {} });

            const headerComponent = await result.headerComponent;
            expect(headerComponent).toEqual({ id: 'header-component' });
        });

        it('degrades to empty embedded regions when their requests fail', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const { fetchComponentWithComponentData } = await import('@/lib/page-designer/component-loader.server');
            const componentError = new Error('Shopper Experience unavailable');
            vi.mocked(fetchCategory).mockResolvedValue({ id: 'root', categories: [] });
            vi.mocked(fetchComponentWithComponentData).mockRejectedValue(componentError);

            const result = loader({
                context: {} as any,
                request: new Request('https://example.test/'),
            } as any);

            await expect(result.headerComponent).resolves.toBeNull();
            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(mockLogger.warn).toHaveBeenCalledWith('AppLayout: embedded component fetch failed', {
                componentId: 'header',
                error: componentError,
            });
        });

        it('should propagate null when fetchComponentWithComponentData resolves to null', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const { fetchComponentWithComponentData } = await import('@/lib/page-designer/component-loader.server');
            vi.mocked(fetchCategory).mockResolvedValue({ id: 'root', name: 'Root', categories: [] });
            vi.mocked(fetchComponentWithComponentData).mockResolvedValue(null);

            const result = loader({
                context: {} as any,
                request: new Request('https://example.test/'),
            } as any);

            await expect(result.headerComponent).resolves.toBeNull();
        });

        it('should return a promise for root that can be used for streaming', async () => {
            const { fetchCategory } = await import('@/lib/api/categories.server');
            const mockFetchCategory = vi.mocked(fetchCategory);

            const mockRootCategory: ShopperProducts.schemas['Category'] = {
                id: 'root',
                name: 'Root',
                categories: [{ id: 'cat1', name: 'Category 1', onlineSubCategoriesCount: 2 }],
            };

            mockFetchCategory.mockResolvedValue(mockRootCategory);

            const mockContext = {} as any;
            const result = loader({ context: mockContext, request: new Request('https://example.test/') } as any);

            expect(result.root).toBeInstanceOf(Promise);

            const rootResolved = await result.root;
            expect(rootResolved).toEqual(mockRootCategory);
        });
    });
});
