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
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Link } from '@/components/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { cn } from '@/lib/utils';

const dysonImg = (sku: string) =>
    `https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/${sku}.png`;

/* DEMO — complement products for V12s Detect Slim Submarine. Data from Dyson catalogue. */
const COMPLEMENT_PRODUCTS = [
    {
        sku: '589623-01',
        shortName: 'V15s Detect Submarine™',
        price: '£749.99',
        tag: 'Full wet & dry',
        why: 'Tackles spills and deep-cleans carpets in a single machine.',
        tint: 'bg-[#1b2318]',
    },
    {
        sku: '630917-01',
        shortName: 'V12 Detect™ Slim Absolute',
        price: '£549.99',
        tag: 'Ultra-lightweight',
        why: 'Featherlight cordless for quick daily pick-ups and high reaches.',
        tint: 'bg-[#181c2a]',
    },
    {
        sku: '664879-01',
        shortName: 'Dyson R2 Nurovi™',
        price: '£749.99',
        tag: 'Automated cleaning',
        why: 'Maps every room and self-empties — cleans while you work.',
        tint: 'bg-[#2a1a1a]',
    },
    {
        sku: '544535-01',
        shortName: 'Purifier Cool PC2 De-NOx',
        price: '£549.99',
        tag: 'Air quality',
        why: 'HEPA H13 filtration captures what the vacuum can\'t — allergens and VOCs.',
        tint: 'bg-[#182a26]',
    },
    {
        sku: '586121-01',
        shortName: 'Dyson Car+Boat',
        price: '£249.99',
        tag: 'On the road',
        why: 'Powerful handheld keeps your car as clean as your home.',
        tint: 'bg-[#2a2a1a]',
    },
] as const;

export default function CompleteYourClean() {
    const { t } = useTranslation('product');

    return (
        <section
            className="-mx-4 sm:-mx-8 lg:-mx-16 py-20 bg-panel overflow-hidden"
            aria-label={t('completeYourClean.ariaLabel', 'Complete your clean')}>

            {/* Header */}
            <div className="px-4 sm:px-8 lg:px-16 max-w-screen-2xl mx-auto mb-12">
                <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                        {t('completeYourClean.eyebrow', 'Also from Dyson')}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                    <h2 className="display-heading text-3xl lg:text-4xl text-foreground">
                        {t('completeYourClean.heading', 'Complete your clean.')}
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                        {t('completeYourClean.subhead', 'Products designed to work alongside yours.')}
                    </p>
                </ScrollReveal>
            </div>

            {/* Card row */}
            <div className="px-4 sm:px-8 lg:px-16 max-w-screen-2xl mx-auto">
                <Carousel opts={{ align: 'start', loop: false }}>
                    <CarouselContent className="-ml-4">
                        {COMPLEMENT_PRODUCTS.map((product, i) => (
                            <CarouselItem
                                key={product.sku}
                                className="pl-4 basis-[80%] sm:basis-[52%] lg:basis-[25%] xl:basis-[20%]">
                                <ScrollReveal delay={i * 0.06}>
                                    <Link
                                        to={`/p/${product.sku}`}
                                        className="group block rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40">
                                        <div className={cn(
                                            'relative h-56 flex items-center justify-center p-8',
                                            product.tint,
                                        )}>
                                            {/* Tag pill */}
                                            <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-widest text-white/55">
                                                {t(`completeYourClean.${product.sku}.tag`, product.tag)}
                                            </span>

                                            {/* Product image */}
                                            <motion.img
                                                src={dysonImg(product.sku)}
                                                alt={t(`completeYourClean.${product.sku}.name`, product.shortName)}
                                                className="w-full h-full object-contain mix-blend-luminosity opacity-90 transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Info area */}
                                        <div className="bg-[#111111] px-5 py-4 border-t border-white/5">
                                            <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 mb-1 group-hover:text-foreground/80 transition-colors">
                                                {t(`completeYourClean.${product.sku}.name`, product.shortName)}
                                            </p>
                                            <p className="text-xs text-muted-foreground mb-3">
                                                {t(`completeYourClean.${product.sku}.why`, product.why)}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-foreground tabular-nums">
                                                    {t(`completeYourClean.${product.sku}.price`, product.price)}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {t('completeYourClean.shop', 'Shop')}
                                                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </ScrollReveal>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

        </section>
    );
}
