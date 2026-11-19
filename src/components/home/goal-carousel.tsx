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
import { motion, useReducedMotion } from 'motion/react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { Link } from '@/components/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { cn } from '@/lib/utils';

/* DEMO: goal card definitions */
const GOAL_CARDS = [
    { key: 'petHair', label: 'Pet hair', headline: 'Pet hair, gone.', bg: 'bg-[#1e2a1e]', href: '/c/cordless-vacuums' },
    { key: 'hardFloors', label: 'Hard floors', headline: 'Floors that shine.', bg: 'bg-[#1a1e2a]', href: '/c/cordless-vacuums' },
    { key: 'carpets', label: 'Carpets', headline: 'Deep clean, every time.', bg: 'bg-[#2a1e1e]', href: '/c/cordless-vacuums' },
    { key: 'allergies', label: 'Allergies', headline: 'Air you can trust.', bg: 'bg-[#1e2a26]', href: '/c/air-purifiers' },
    { key: 'smallSpaces', label: 'Small spaces', headline: 'Reach every corner.', bg: 'bg-[#2a2a1e]', href: '/c/cordless-vacuums' },
    { key: 'wholeHome', label: 'Whole home', headline: 'Clean while you sleep.', bg: 'bg-[#1e1e2a]', href: '/c/robot-vacuums' },
    { key: 'wetDry', label: 'Wet & dry', headline: 'Spills? No problem.', bg: 'bg-[#1a2a2a]', href: '/c/wet-floor-cleaners' },
    { key: 'quiet', label: 'Quiet clean', headline: 'Powerful. Whisper-quiet.', bg: 'bg-[#262626]', href: '/c/cordless-vacuums' },
] as const;

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

    return (
        <section className="py-24 bg-background overflow-hidden" aria-label={t('goalCarousel.ariaLabel', 'Find your clean')}>
            <div className="section-container mb-10">
                <ScrollReveal>
                    {/* DEMO copy */}
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

                    {/* Goal cards */}
                    {GOAL_CARDS.map((goal) => (
                        <CarouselItem key={goal.key} className="pl-4 basis-[75%] sm:basis-[50%] lg:basis-[25%]">
                            <Link to={goal.href} className="block h-full group">
                                <div
                                    className={cn(
                                        'rounded-2xl overflow-hidden h-[420px] flex flex-col justify-between p-6 transition-transform duration-500 group-hover:scale-[1.02]',
                                        goal.bg
                                    )}>
                                    <span className="inline-block self-start text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-dark-band-foreground">
                                        {t(`goalCarousel.goal.${goal.key}`, goal.label)}
                                    </span>
                                    <p className="display-heading text-2xl text-dark-band-foreground">
                                        {/* DEMO copy */}
                                        {t(`goalCarousel.goalHeadline.${goal.key}`, goal.headline)}
                                    </p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
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
        </section>
    );
}
