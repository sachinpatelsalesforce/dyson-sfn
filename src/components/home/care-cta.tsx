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
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/link';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/* DEMO: care cards — links point to real category routes */
const CARE_CARDS = [
    {
        key: 'warranty',
        icon: '◼',
        title: '2-year warranty',
        body: "Register your machine and we'll protect it for two years.",
        cta: 'Register now',
        href: '/account',
        variant: 'outline' as const,
    },
    {
        key: 'spares',
        icon: '◈',
        title: 'Genuine spare parts',
        body: 'Only original Dyson parts keep your machine performing at its best.',
        cta: 'Shop parts',
        href: '/c/accessories',
        variant: 'outline' as const,
    },
    {
        key: 'repairs',
        icon: '◉',
        title: 'Expert repairs',
        body: 'Our engineers are trained to fix any Dyson, fast.',
        cta: 'Book a repair',
        href: '/account',
        variant: 'outline' as const,
    },
] as const;

export default function CareCta() {
    const { t } = useTranslation('home');

    return (
        <section className="py-24 bg-muted/30" aria-label={t('care.ariaLabel', 'Dyson care')}>
            <div className="section-container">
                <ScrollReveal>
                    <h2 className="display-heading text-4xl lg:text-5xl text-foreground mb-14 text-center">
                        {/* DEMO copy */}
                        {t('care.heading', "We're with you, long after the box is opened.")}
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CARE_CARDS.map((card, i) => (
                        <ScrollReveal key={card.key} delay={i * 0.1}>
                            <div className="bg-card rounded-2xl p-8 flex flex-col h-full border border-border">
                                <span className="text-2xl text-muted-foreground mb-6" aria-hidden="true">
                                    {card.icon}
                                </span>
                                <h3 className="font-medium text-lg text-foreground mb-3">
                                    {/* DEMO copy */}
                                    {t(`care.${card.key}.title`, card.title)}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-8">
                                    {/* DEMO copy */}
                                    {t(`care.${card.key}.body`, card.body)}
                                </p>
                                <Button asChild variant={card.variant} size="sm" className="self-start">
                                    <Link to={card.href}>{t(`care.${card.key}.cta`, card.cta)}</Link>
                                </Button>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
