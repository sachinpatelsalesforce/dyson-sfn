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
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/link';
import { Button } from '@/components/ui/button';
import { SeoMeta } from '@/components/seo-meta';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function EngineeringPage(): ReactElement {
    const { t } = useTranslation('engineering');

    const stats: { value: string; label: string }[] = t('stats.items', { returnObjects: true }) as { value: string; label: string }[];
    const standards: string[] = t('standards.items', { returnObjects: true }) as string[];

    return (
        <div className="bg-background text-foreground pb-24">
            <SeoMeta
                title={t('meta.title')}
                description={t('meta.description')}
            />

            {/* Hero */}
            <section className="bg-dark-band py-32">
                <div className="section-container">
                    <ScrollReveal direction="none" delay={0.1}>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                            {t('hero.eyebrow')}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <h1 className="display-heading text-5xl lg:text-7xl max-w-2xl">
                            {t('hero.heading')}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.3}>
                        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                            {t('hero.subhead')}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Stats band */}
            <section className="py-20 bg-card">
                <div className="section-container">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl text-center mb-14">
                            {t('stats.heading')}
                        </h2>
                    </ScrollReveal>
                    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {stats.map((item, i) => (
                            <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                                <li>
                                    <p className="display-heading text-4xl lg:text-5xl">{item.value}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
                                </li>
                            </ScrollReveal>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Technology cards */}
            <section className="py-20">
                <div className="section-container">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-12">
                            {t('cards.heading')}
                        </h2>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {(['cyclone', 'laser', 'filtration'] as const).map((key, i) => (
                            <ScrollReveal key={key} direction="up" delay={i * 0.1}>
                                <div className="bg-panel rounded-2xl p-8 h-full flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold">{t(`cards.${key}.title`)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                        {t(`cards.${key}.body`)}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standards accordion */}
            <section className="py-20 bg-card">
                <div className="section-container max-w-3xl">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-4">
                            {t('standards.heading')}
                        </h2>
                        <p className="text-muted-foreground mb-10">{t('standards.intro')}</p>
                    </ScrollReveal>
                    <Accordion type="multiple">
                        {standards.map((standard, i) => (
                            <AccordionItem key={i} value={`standard-${i}`}>
                                <AccordionTrigger className="text-left">{standard}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground">
                                        {/* DEMO: detailed standard description would go here */}
                                        Testing performed against this standard by an accredited third-party laboratory. Results available on request.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="section-container text-center">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-4">{t('cta.heading')}</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t('cta.body')}</p>
                        <Button asChild size="lg">
                            <Link to="/p/485296-01">{t('cta.button')}</Link>
                        </Button>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
