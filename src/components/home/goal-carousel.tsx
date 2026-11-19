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
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Link } from '@/components/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { cn } from '@/lib/utils';

const BASE = 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/gallery/home/floorcare';

/* DEMO: goal card definitions — images from Dyson's CDN gallery */
const GOAL_CARDS = [
    {
        key: 'petHair', label: 'Pet hair', headline: 'Pet hair, gone.', bg: 'bg-[#1e2a1e]', href: '/c/cordless-vacuums',
        image: `${BASE}/cordless/v15-detect/Web_V15_Gallery_PDP_7_vertical.jpg`,
        description: 'High Torque motorbar head attacks pet hair at the root — no tangles, no trail left behind. Pairs with allergen mode to clear pet dander from the air.',
    },
    {
        key: 'hardFloors', label: 'Hard floors', headline: 'Floors that shine.', bg: 'bg-[#1a1e2a]', href: '/c/cordless-vacuums',
        image: `${BASE}/cordless/v12-detect-slim/Web_V12_Detect-Slim_Gallery_PDP_4_vertical.jpg`,
        description: 'Carbon fibre filaments sweep fine dust while 150 AW of suction picks up larger debris — without scratching hard surfaces.',
    },
    {
        key: 'carpets', label: 'Carpets', headline: 'Deep clean, every time.', bg: 'bg-[#2a1e1e]', href: '/c/cordless-vacuums',
        image: `${BASE}/cordless/v15-detect/Web_V15_Gallery_PDP_5_vertical.jpg`,
        description: 'Stiff nylon tufts drive deep into carpet fibres to pull out embedded hair and grit that surface-only heads leave behind.',
    },
    {
        key: 'allergies', label: 'Allergies', headline: 'Air you can trust.', bg: 'bg-[#1e2a26]', href: '/c/air-purifiers',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/products/air-treatment/purifiers/11s/hp11/pdp/gallery/white-white/HP11-PDP-WHWH-Gallery-5_vertical.jpg',
        description: 'Five-stage HEPA H13 filtration captures 99.97% of ultrafine particles — allergens, dust mites, and volatile organic compounds. Sealed end-to-end.',
    },
    {
        key: 'smallSpaces', label: 'Small spaces', headline: 'Reach every corner.', bg: 'bg-[#2a2a1e]', href: '/c/cordless-vacuums',
        image: `${BASE}/cordless/v12-detect-slim/Web_V12_Detect-Slim_Gallery_PDP_3_vertical.jpg`,
        description: 'The slim profile and angled wand reach under low furniture and into tight corners without disassembling. Compact. Quiet. Powerful.',
    },
    {
        key: 'wholeHome', label: 'Whole home', headline: 'Clean while you sleep.', bg: 'bg-[#1e1e2a]', href: '/c/robot-vacuums',
        image: `${BASE}/robots/Web_914A_PDP_Gallery_03_Core-claim_landscape_vertical.jpg`,
        description: 'Set a schedule, go to bed, wake up to clean floors. The robot maps every room, navigates obstacles, and self-empties its bin.',
    },
    {
        key: 'wetDry', label: 'Wet & dry', headline: 'Spills? No problem.', bg: 'bg-[#1a2a2a]', href: '/c/wet-floor-cleaners',
        image: `${BASE}/wet-dry/v15s-submarine/Web_V15_submarine_Gallery_PDP_3_vertical.jpg`,
        description: 'The Submarine wet roller washes and vacuums in one pass. It self-cleans — so you are never mopping with yesterday\'s water.',
    },
    {
        key: 'quiet', label: 'Quiet clean', headline: 'Powerful. Whisper-quiet.', bg: 'bg-[#262626]', href: '/c/cordless-vacuums',
        image: `${BASE}/cordless/v10-konical/Web_PDP_Gallery_285O_KONICAL_05_vertical.jpg`,
        description: 'Lower-output mode reduces noise to 61 dB — quieter than a normal conversation. Perfect for nap times, conference calls, and open-plan living.',
    },
] as const;

type GoalKey = (typeof GOAL_CARDS)[number]['key'];

/* Animated particle count widget for the featured card — DEMO */
function ParticleReadout() {
    const shouldReduceMotion = useReducedMotion();
    const [level, setLevel] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

    useEffect(() => {
        if (shouldReduceMotion) return;
        const sequence: Array<['HIGH' | 'MEDIUM' | 'LOW', number]> = [
            ['HIGH', 2000],
            ['MEDIUM', 2500],
            ['LOW', 3000],
            ['HIGH', 2000],
        ];
        let i = 0;
        let timer: ReturnType<typeof setTimeout>;
        function cycle() {
            const [lev, delay] = sequence[i % sequence.length];
            setLevel(lev);
            timer = setTimeout(() => { i++; cycle(); }, delay);
        }
        cycle();
        return () => clearTimeout(timer);
    }, [shouldReduceMotion]);

    const colourMap = { HIGH: 'text-destructive', MEDIUM: 'text-warning', LOW: 'text-success' };

    return (
        <div className="rounded-xl bg-black/40 backdrop-blur-sm px-4 py-3 inline-flex flex-col gap-1">
            <p className="text-xs uppercase tracking-widest text-dark-band-foreground/50">Particle level</p>
            <p className={cn('text-2xl font-bold tabular-nums transition-colors duration-700', colourMap[level])}>
                {level}
            </p>
        </div>
    );
}

export default function GoalCarousel() {
    const { t } = useTranslation('home');
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [activeKey, setActiveKey] = useState<GoalKey | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const onSelect = useCallback(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        setCount(api.scrollSnapList().length);
    }, [api]);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on('select', onSelect);
        return () => { api.off('select', onSelect); };
    }, [api, onSelect]);

    const toggle = (key: GoalKey) =>
        setActiveKey((prev) => (prev === key ? null : key));

    const activeGoal = GOAL_CARDS.find((g) => g.key === activeKey) ?? null;

    const panelTransition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

    return (
        <section className="py-24 bg-background overflow-hidden" aria-label={t('goalCarousel.ariaLabel', 'Find your clean')}>
            <div className="section-container mb-10">
                <ScrollReveal>
                    <h2 className="display-heading text-4xl lg:text-5xl text-foreground">
                        {t('goalCarousel.heading', 'Find your clean.')}
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.1}>
                    <p className="text-muted-foreground mt-3">
                        {t('goalCarousel.subhead', 'Start from the job, not the model.')}
                    </p>
                </ScrollReveal>
            </div>

            <Carousel
                setApi={setApi}
                opts={{ align: 'start', loop: false }}
                className="section-container">
                <CarouselContent className="-ml-4">
                    {/* Featured "Find your machine" card — DEMO */}
                    <CarouselItem className="pl-4 basis-[85%] sm:basis-[60%] lg:basis-[35%]">
                        <div className="bg-dark-band rounded-2xl overflow-hidden h-[420px] flex flex-col justify-between p-8">
                            <ParticleReadout />
                            <div>
                                <p className="text-xs uppercase tracking-widest text-dark-band-foreground/50 mb-2">
                                    {t('goalCarousel.guidedPicker', 'Guided picker')}
                                </p>
                                <p className="display-heading text-2xl text-dark-band-foreground mb-4">
                                    {t('goalCarousel.findYourMachine', 'Find your machine.')}
                                </p>
                                <Link
                                    to="/c/cordless-vacuums"
                                    className="text-sm font-medium text-dark-band-foreground/70 hover:text-dark-band-foreground transition-colors underline underline-offset-4">
                                    {t('goalCarousel.startFinder', 'Start the finder →')}
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>

                    {/* Goal cards — image-led with expand toggle */}
                    {GOAL_CARDS.map((goal) => {
                        const isActive = activeKey === goal.key;
                        return (
                            <CarouselItem key={goal.key} className="pl-4 basis-[75%] sm:basis-[50%] lg:basis-[25%]">
                                <div
                                    className={cn(
                                        'relative rounded-2xl overflow-hidden h-[420px] transition-[opacity,box-shadow] duration-300',
                                        goal.bg,
                                        isActive
                                            ? 'ring-2 ring-foreground/50 shadow-[0_0_0_4px_hsl(var(--background))]'
                                            : activeKey ? 'opacity-55' : '',
                                    )}>
                                    {/* Lifestyle image */}
                                    <img
                                        src={goal.image}
                                        alt=""
                                        aria-hidden="true"
                                        className="absolute inset-0 w-full h-full object-cover object-center"
                                        loading="lazy"
                                    />

                                    {/* Gradient scrim for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                                    {/* Category pill */}
                                    <span className="absolute top-5 left-5 inline-block text-xs font-medium px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white/85">
                                        {t(`goalCarousel.goal.${goal.key}`, goal.label)}
                                    </span>

                                    {/* Bottom row: headline + toggle */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                                        <p className="display-heading text-2xl text-white leading-tight flex-1 pr-2">
                                            {t(`goalCarousel.goalHeadline.${goal.key}`, goal.headline)}
                                        </p>
                                        <button
                                            onClick={() => toggle(goal.key)}
                                            aria-expanded={isActive}
                                            aria-label={
                                                isActive
                                                    ? t('goalCarousel.closeGoal', `Close ${goal.label}`)
                                                    : t('goalCarousel.openGoal', `Explore ${goal.label}`)
                                            }
                                            className={cn(
                                                'shrink-0 flex items-center justify-center rounded-full size-9',
                                                'backdrop-blur-sm border transition-all duration-200',
                                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                                                'hover:scale-110 active:scale-95',
                                                isActive
                                                    ? 'bg-white text-black border-transparent'
                                                    : 'bg-white/15 text-white border-white/20 hover:bg-white/25',
                                            )}>
                                            <motion.span
                                                className="text-base font-light leading-none select-none"
                                                animate={{ rotate: isActive ? 45 : 0 }}
                                                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}>
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

            {/* Progress bar */}
            {count > 0 && (
                <div className="section-container mt-6">
                    <div className="h-px bg-border w-full max-w-xs">
                        <motion.div
                            className="h-px bg-foreground origin-left"
                            animate={{ scaleX: count > 0 ? (current + 1) / count : 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{ transformOrigin: 'left' }}
                        />
                    </div>
                </div>
            )}

            {/* Expandable detail panel */}
            <AnimatePresence mode="wait">
                {activeGoal && (
                    <motion.div
                        key={activeGoal.key}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={panelTransition}
                        className="overflow-hidden">
                        <div className="section-container">
                            <div className="mt-5 rounded-2xl bg-panel border border-border/40 p-6 lg:p-8">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                                            {t(`goalCarousel.goal.${activeGoal.key}`, activeGoal.label)}
                                        </p>
                                        <h3 className="display-heading text-2xl lg:text-3xl text-foreground mb-3">
                                            {t(`goalCarousel.goalHeadline.${activeGoal.key}`, activeGoal.headline)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            {t(`goalCarousel.goalDesc.${activeGoal.key}`, activeGoal.description)}
                                        </p>
                                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                                            <Link
                                                to={activeGoal.href}
                                                className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors">
                                                {t('goalCarousel.shopRange', 'Shop this range →')}
                                            </Link>
                                            <button
                                                onClick={() => setActiveKey(null)}
                                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                <X className="size-3.5" aria-hidden="true" />
                                                {t('goalCarousel.close', 'Close')}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Image thumbnail */}
                                    <div className={cn(
                                        'hidden lg:block shrink-0 w-44 h-44 rounded-2xl overflow-hidden',
                                        activeGoal.bg,
                                    )}>
                                        <img
                                            src={activeGoal.image}
                                            alt={t(`goalCarousel.goalHeadline.${activeGoal.key}`, activeGoal.headline)}
                                            className="w-full h-full object-cover object-center"
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
