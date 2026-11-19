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
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
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

/* DEMO benefit cards — replace images/copy/hrefs as needed */
const CARDS = [
    {
        key: 'petHair',
        category: 'Pet homes',
        headline: 'Pet hair. Dealt with.',
        description:
            'The motorised High Torque head generates powerful suction across all floor types. Carbon fibre filaments pick up pet hair and fine debris in one pass — no tangles, no trail left behind.',
        image: dysonImg('589623-01'), // V15s Detect Submarine
        tint: 'bg-[#1b2318]',
        href: '/c/cordless-vacuums',
    },
    {
        key: 'hardFloors',
        category: 'Hard floors',
        headline: 'Floors that actually shine.',
        description:
            'The Slim Fluffy head glides across hard floors with 150 AW of suction without scratching. Carbon fibre filaments sweep fine dust right up to the edges — no streaks, no residue.',
        image: dysonImg('630917-01'), // V12 Detect Slim Absolute
        tint: 'bg-[#181c2a]',
        href: '/c/cordless-vacuums',
    },
    {
        key: 'airQuality',
        category: 'Air quality',
        headline: 'Breathe. Actually breathe.',
        description:
            'Five-layer HEPA H13 filtration captures 99.97% of ultrafine particles — allergens, pollutants, and volatile organic compounds included. Sealed end-to-end so nothing leaks back out.',
        image: dysonImg('544535-01'), // Purifier Cool PC2 De-NOx
        tint: 'bg-[#182a26]',
        href: '/c/air-purifiers',
    },
    {
        key: 'wetDry',
        category: 'Wet & dry',
        headline: 'Wet spill. Clean floor.',
        description:
            'The Submarine wet roller head vacuums and mops simultaneously. It self-cleans after every pass — so you are never spreading yesterday\'s mess across today\'s floor.',
        image: dysonImg('485296-01'), // V12s Detect Slim Submarine
        tint: 'bg-[#1e1a2c]',
        href: '/c/wet-floor-cleaners',
    },
    {
        key: 'automation',
        category: 'Automation',
        headline: 'Clean while you sleep.',
        description:
            'The R2 Nurovi maps every room, navigates obstacles intelligently, and empties its own bin. Set a schedule, walk away, and come back to genuinely clean floors.',
        image: dysonImg('664879-01'), // R2 Nurovi Wash+Dry robot
        tint: 'bg-[#2a1a1a]',
        href: '/c/robot-vacuums',
    },
    {
        key: 'hairCare',
        category: 'Hair care',
        headline: 'Styled. Protected.',
        description:
            'The Airwrap Co-anda 2x uses Coanda airflow to curl, wave, dry, and smooth — with no extreme heat. It achieves multiple styles without the damage caused by traditional tongs or irons.',
        image: dysonImg('598792-01'), // Airwrap Co-anda 2x
        tint: 'bg-[#2a2518]',
        href: '/c/hair',
    },
] as const;

type CardKey = (typeof CARDS)[number]['key'];

export default function BenefitCards() {
    const { t } = useTranslation('home');
    const [activeKey, setActiveKey] = useState<CardKey | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const activeCard = CARDS.find((c) => c.key === activeKey) ?? null;

    const toggle = (key: CardKey) =>
        setActiveKey((prev) => (prev === key ? null : key));

    const panelTransition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const };

    return (
        <section
            className="py-24 bg-background overflow-hidden"
            aria-label={t('benefitCards.ariaLabel', 'What Dyson does best')}>

            {/* Section header */}
            <div className="section-container mb-12">
                <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        {t('benefitCards.eyebrow', 'The right tool')}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                    <h2 className="display-heading text-4xl lg:text-5xl text-foreground max-w-2xl">
                        {t('benefitCards.heading', 'Start from the job, not the model.')}
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <p className="text-muted-foreground mt-4 max-w-md text-sm">
                        {t(
                            'benefitCards.subhead',
                            'Every Dyson product is engineered for a specific purpose. Identify yours — the right machine follows.',
                        )}
                    </p>
                </ScrollReveal>
            </div>

            {/* Card row */}
            <Carousel opts={{ align: 'start', loop: false }} className="section-container">
                <CarouselContent className="-ml-4">
                    {CARDS.map((card) => {
                        const isActive = activeKey === card.key;
                        return (
                            <CarouselItem
                                key={card.key}
                                className="pl-4 basis-[82%] sm:basis-[52%] lg:basis-[33.333%]">
                                <div
                                    className={cn(
                                        'relative rounded-3xl overflow-hidden h-[460px]',
                                        'transition-[box-shadow,opacity] duration-300',
                                        card.tint,
                                        isActive
                                            ? 'ring-2 ring-foreground/50 shadow-[0_0_0_4px_hsl(var(--background))]'
                                            : activeKey
                                              ? 'opacity-60'
                                              : '',
                                    )}>
                                    {/* Product image — luminosity blend so it reads against tint */}
                                    <img
                                        src={card.image}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-contain object-center p-8 mix-blend-luminosity opacity-90"
                                    />

                                    {/* Bottom scrim */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                    {/* Category label */}
                                    <span className="absolute top-5 left-5 text-[10px] font-semibold uppercase tracking-widest text-white/55">
                                        {t(`benefitCards.${card.key}.category`, card.category)}
                                    </span>

                                    {/* Bottom row: headline + toggle */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                                        <h3 className="display-heading text-xl text-white leading-tight flex-1 pr-2">
                                            {t(`benefitCards.${card.key}.headline`, card.headline)}
                                        </h3>

                                        <button
                                            onClick={() => toggle(card.key)}
                                            aria-expanded={isActive}
                                            aria-label={
                                                isActive
                                                    ? t('benefitCards.closeCard', `Close ${card.headline}`)
                                                    : t('benefitCards.openCard', `Explore ${card.headline}`)
                                            }
                                            className={cn(
                                                'shrink-0 flex items-center justify-center rounded-full size-10',
                                                'backdrop-blur-sm border transition-all duration-200',
                                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                                                'hover:scale-110 active:scale-95',
                                                isActive
                                                    ? 'bg-white text-black border-white/0'
                                                    : 'bg-white/15 text-white border-white/25 hover:bg-white/25',
                                            )}>
                                            <motion.span
                                                className="text-lg font-light leading-none select-none"
                                                animate={{ rotate: isActive ? 45 : 0 }}
                                                transition={
                                                    shouldReduceMotion
                                                        ? { duration: 0 }
                                                        : { duration: 0.22, ease: 'easeInOut' }
                                                }>
                                                +
                                            </motion.span>
                                        </button>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>

            {/* Expandable detail panel */}
            <AnimatePresence mode="wait">
                {activeCard && (
                    <motion.div
                        key={activeCard.key}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={panelTransition}
                        className="overflow-hidden">
                        <div className="section-container">
                            <div className="mt-5 rounded-2xl bg-panel border border-border/40 p-6 lg:p-8">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                            {t(`benefitCards.${activeCard.key}.category`, activeCard.category)}
                                        </p>
                                        <h3 className="display-heading text-2xl lg:text-3xl text-foreground mb-3">
                                            {t(`benefitCards.${activeCard.key}.headline`, activeCard.headline)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            {t(`benefitCards.${activeCard.key}.description`, activeCard.description)}
                                        </p>
                                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                                            <Link
                                                to={activeCard.href}
                                                className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors">
                                                {t('benefitCards.shopRange', 'Shop this range →')}
                                            </Link>
                                            <button
                                                onClick={() => setActiveKey(null)}
                                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                <X className="size-3.5" aria-hidden="true" />
                                                {t('benefitCards.close', 'Close')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product image thumbnail */}
                                    <div
                                        className={cn(
                                            'hidden lg:flex shrink-0 w-44 h-44 rounded-2xl items-center justify-center overflow-hidden',
                                            activeCard.tint,
                                        )}>
                                        <img
                                            src={activeCard.image}
                                            alt={t(`benefitCards.${activeCard.key}.headline`, activeCard.headline)}
                                            className="w-full h-full object-contain p-4 mix-blend-luminosity"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
