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
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

import heroImage from '/images/dyson-hero-v12s.jpg';

export default function DysonHero() {
    const { t } = useTranslation('home');
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const imageY = useTransform(
        scrollYProgress,
        [0, 1],
        shouldReduceMotion ? ['0%', '0%'] : ['0%', '15%']
    );

    return (
        <section
            ref={sectionRef}
            aria-label={t('hero.dyson.ariaLabel', 'Hero')}
            className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] min-h-[100svh] overflow-hidden">
            {/* Left: text content */}
            <div className="bg-background flex items-center order-2 lg:order-1">
                <div className="section-container w-full pt-24 pb-16 lg:py-32">
                    <ScrollReveal direction="none" delay={0.1}>
                        {/* DEMO copy */}
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                            {t('hero.dyson.eyebrow', 'New arrival')}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <h1 className="display-heading text-5xl lg:text-[5.5rem] mb-6 text-foreground">
                            {/* DEMO copy */}
                            {t('hero.dyson.heading', 'Engineered to clean deeper.')}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.3}>
                        {/* DEMO copy */}
                        <p className="text-lg text-muted-foreground mb-10 max-w-sm leading-relaxed">
                            {t(
                                'hero.dyson.subhead',
                                'The V12s Detect Slim Submarine. Laser-guided. Self-cleaning.'
                            )}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.4}>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg">
                                <Link to="/p/485296-01">{t('hero.dyson.ctaPrimary', 'Shop now')}</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="#engineering">{t('hero.dyson.ctaSecondary', 'See how it works')}</a>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Right: product image with parallax */}
            <div className="relative overflow-hidden bg-dark-band order-1 lg:order-2 min-h-[50svh] lg:min-h-0">
                <motion.div
                    className="absolute inset-0"
                    style={{ y: imageY }}>
                    <img
                        src={heroImage}
                        alt={t('hero.dyson.imageAlt', 'Dyson V12s Detect Slim Submarine vacuum head')}
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                        fetchPriority="high"
                        width={640}
                        height={800}
                    />
                </motion.div>
            </div>
        </section>
    );
}
