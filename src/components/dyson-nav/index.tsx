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
import { useState, Suspense } from 'react';
import { Await } from 'react-router';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavLink, Link } from '@/components/link';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import type { ShopperProducts } from '@/scapi';
import { createCategoryUrlFromScapiCategory } from '@/lib/seo/scapi-slugs';
import { useSeoUrlContext } from '@/hooks/use-seo-url-context';

// Goal definitions — each maps to a category ID and a filterBestFor value
const GOALS = [
    { key: 'petHair', icon: '🐾', categoryId: 'cordless-vacuums' },
    { key: 'hardFloors', icon: '✨', categoryId: 'cordless-vacuums' },
    { key: 'carpets', icon: '🏠', categoryId: 'cordless-vacuums' },
    { key: 'allergies', icon: '🌿', categoryId: 'air-purifiers' },
    { key: 'smallSpaces', icon: '📐', categoryId: 'cordless-vacuums' },
    { key: 'wholeHome', icon: '🔄', categoryId: 'robot-vacuums' },
    { key: 'wetDry', icon: '💧', categoryId: 'wet-floor-cleaners' },
    { key: 'quiet', icon: '🔇', categoryId: 'cordless-vacuums' },
] as const;

const ENGINEERING_LINKS = [
    { key: 'insideMachine', to: '/engineering' },
    { key: 'filtrationAir', to: '/engineering' },
    { key: 'testing', to: '/engineering' },
    { key: 'sustainability', to: '/sustainability' },
] as const;

const SUPPORT_LINKS = [
    { key: 'register' },
    { key: 'repairs' },
    { key: 'spareParts' },
    { key: 'contact' },
] as const;

interface DysonNavProps {
    categoriesPromise: Promise<ShopperProducts.schemas['Category']>;
}

function CategoryLinkList({ categories }: { categories: ShopperProducts.schemas['Category'][] }) {
    const { t } = useTranslation('header');
    const seoUrlContext = useSeoUrlContext();

    return (
        <ul className="space-y-2">
            {categories.map((cat) => {
                const url = createCategoryUrlFromScapiCategory(cat, seoUrlContext);
                return (
                    <li key={cat.id}>
                        {url != null ? (
                            <NavLink
                                to={url}
                                className="text-sm text-header-menu-foreground/70 hover:text-header-menu-foreground transition-colors">
                                {cat.name}
                            </NavLink>
                        ) : (
                            <span className="text-sm text-header-menu-foreground/50">{cat.name}</span>
                        )}
                    </li>
                );
            })}
            <li className="pt-2 border-t border-header-menu-border">
                <NavLink
                    to="/c/root"
                    className="text-sm font-medium text-header-menu-foreground hover:text-header-menu-foreground/70 transition-colors underline underline-offset-4">
                    {t('shopAll', 'Shop all products')}
                </NavLink>
            </li>
        </ul>
    );
}

function ShopPanel({ categories }: { categories: ShopperProducts.schemas['Category'][] }) {
    const { t } = useTranslation('header');

    return (
        <div className="section-container py-8 grid grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Left: featured product spotlight */}
            <div>
                <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-4">
                    {t('nav.featuredProduct', 'Featured')}
                </p>
                <NavLink
                    to="/p/485296-01"
                    className="group block rounded-xl overflow-hidden bg-panel hover:opacity-90 transition-opacity">
                    <div className="aspect-square bg-muted flex items-center justify-center p-6">
                        <img
                            src="https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/485296-01.png"
                            alt="Dyson V12s Detect Slim Submarine"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="p-4">
                        <p className="text-xs text-header-menu-foreground/50 mb-1">{t('nav.newIn', 'New in')}</p>
                        <p className="text-sm font-medium text-header-menu-foreground">
                            V12s Detect Slim Submarine
                        </p>
                    </div>
                </NavLink>
            </div>

            {/* Right: category link list */}
            <div>
                <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-4">
                    {t('nav.allCategories', 'All categories')}
                </p>
                <div className="columns-2 gap-8">
                    <CategoryLinkList categories={categories} />
                </div>
            </div>
        </div>
    );
}

function FindYourCleanPanel({ categories }: { categories: ShopperProducts.schemas['Category'][] }) {
    const { t } = useTranslation('header');
    const seoUrlContext = useSeoUrlContext();

    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

    return (
        <div className="section-container py-8 grid grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Left: "Find your machine" featured tile */}
            <div>
                <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-4">
                    {t('nav.startHere', 'Start here')}
                </p>
                <div className="rounded-xl bg-dark-band text-dark-band-foreground p-6">
                    <p className="text-xs uppercase tracking-widest text-dark-band-foreground/50 mb-2">
                        {t('nav.guidedPicker', 'Guided picker')}
                    </p>
                    <p className="display-heading text-xl mb-3">
                        {t('nav.findYourMachine', 'Find your machine')}
                    </p>
                    <p className="text-sm text-dark-band-foreground/60 mb-4">
                        {t('nav.finderDesc', "Answer 3 quick questions and we’ll recommend the right cleaner for your home.")}
                    </p>
                    <NavLink
                        to="/c/cordless-vacuums"
                        className="inline-block text-xs font-medium underline underline-offset-4 hover:opacity-70 transition-opacity">
                        {t('nav.startFinder', 'Start the finder →')}
                    </NavLink>
                </div>
            </div>

            {/* Right: 8 goal links */}
            <div>
                <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-4">
                    {t('nav.byGoal', 'Shop by goal')}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                    {GOALS.map(({ key, icon, categoryId }) => {
                        const cat = categoryMap[categoryId];
                        const url = cat ? createCategoryUrlFromScapiCategory(cat, seoUrlContext) : undefined;
                        return (
                            <li key={key}>
                                {url != null ? (
                                    <NavLink
                                        to={url}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-panel transition-colors group">
                                        <span className="text-lg" aria-hidden="true">{icon}</span>
                                        <span className="text-sm text-header-menu-foreground/80 group-hover:text-header-menu-foreground transition-colors">
                                            {t(`nav.goal.${key}`, key)}
                                        </span>
                                    </NavLink>
                                ) : (
                                    <span className="flex items-center gap-3 px-3 py-2.5 opacity-40 cursor-default">
                                        <span className="text-lg" aria-hidden="true">{icon}</span>
                                        <span className="text-sm">{t(`nav.goal.${key}`, key)}</span>
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

function EngineeringPanel() {
    const { t } = useTranslation('header');

    return (
        <div className="section-container py-8">
            <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-6">
                {t('nav.engineeringTitle', 'Inside Dyson')}
            </p>
            <ul className="grid grid-cols-4 gap-6">
                {ENGINEERING_LINKS.map(({ key, to }) => (
                    <li key={key}>
                        <Link to={to} className="block rounded-xl bg-panel p-5 h-full flex flex-col gap-3 hover:bg-muted transition-colors">
                            <p className="text-sm font-medium text-header-menu-foreground">
                                {t(`nav.engineering.${key}`, key)}
                            </p>
                            <p className="text-xs text-header-menu-foreground/50 flex-1">
                                {t(`nav.engineering.${key}Desc`, '')}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SupportPanel() {
    const { t } = useTranslation('header');

    return (
        <div className="section-container py-8">
            <p className="text-xs uppercase tracking-widest text-header-menu-foreground/40 mb-6">
                {t('nav.supportTitle', 'How can we help?')}
            </p>
            <ul className="grid grid-cols-4 gap-6">
                {SUPPORT_LINKS.map(({ key }) => (
                    <li key={key}>
                        <div className="rounded-xl bg-panel p-5 h-full flex flex-col gap-3 hover:bg-muted transition-colors">
                            <p className="text-sm font-medium text-header-menu-foreground">
                                {t(`nav.support.${key}`, key)}
                            </p>
                            <p className="text-xs text-header-menu-foreground/50 flex-1">
                                {t(`nav.support.${key}Desc`, '')}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function DysonNavContent({ categories }: { categories: ShopperProducts.schemas['Category'][] }) {
    const { t } = useTranslation('header');
    const [openValue, setOpenValue] = useState('');

    return (
        <div className="relative">
            {/* Backdrop blur overlay — rendered when any panel is open */}
            {openValue && (
                <div
                    aria-hidden="true"
                    className="fixed inset-0 top-[var(--header-height)] bg-black/20 backdrop-blur-sm z-40 pointer-events-none"
                />
            )}
            <NavigationMenu
                value={openValue}
                onValueChange={setOpenValue}
                className="hidden lg:flex h-full items-center">
                <NavigationMenuList className="gap-1">
                    <NavigationMenuItem value="shop">
                        <NavigationMenuTrigger
                            className={cn(
                                'text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent',
                                'text-header-foreground hover:text-header-foreground/70 transition-colors px-3 py-2'
                            )}>
                            {t('nav.shop', 'Shop')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ShopPanel categories={categories} />
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem value="findYourClean">
                        <NavigationMenuTrigger
                            className={cn(
                                'text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent',
                                'text-header-foreground hover:text-header-foreground/70 transition-colors px-3 py-2'
                            )}>
                            {t('nav.findYourClean', 'Find your clean')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <FindYourCleanPanel categories={categories} />
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem value="engineering">
                        <NavigationMenuTrigger
                            className={cn(
                                'text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent',
                                'text-header-foreground hover:text-header-foreground/70 transition-colors px-3 py-2'
                            )}>
                            {t('nav.engineeringLabel', 'Engineering')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <EngineeringPanel />
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem value="support">
                        <NavigationMenuTrigger
                            className={cn(
                                'text-sm font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent',
                                'text-header-foreground hover:text-header-foreground/70 transition-colors px-3 py-2'
                            )}>
                            {t('nav.supportLabel', 'Support')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <SupportPanel />
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

export default function DysonNav({ categoriesPromise }: DysonNavProps) {
    return (
        <Suspense fallback={<div className="hidden lg:block h-full w-48" aria-hidden="true" />}>
            <Await resolve={categoriesPromise}>
                {(rootCategory) => {
                    const categories = (rootCategory as ShopperProducts.schemas['Category']).categories ?? [];
                    return <DysonNavContent categories={categories} />;
                }}
            </Await>
        </Suspense>
    );
}
