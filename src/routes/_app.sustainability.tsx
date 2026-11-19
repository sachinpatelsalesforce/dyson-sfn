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

export default function SustainabilityPage(): ReactElement {
    const { t } = useTranslation('sustainability');

    return (
        <div className="bg-background text-foreground pb-24">
            <SeoMeta
                title={t('meta.title')}
                description={t('meta.description')}
            />

            {/* Letter / quote hero */}
            <section className="bg-dark-band py-32">
                <div className="section-container max-w-3xl">
                    <ScrollReveal direction="none" delay={0.1}>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                            {t('letter.eyebrow')}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <h1 className="display-heading text-4xl lg:text-6xl mb-8">
                            {t('letter.heading')}
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.3}>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('letter.body')}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Three pillars */}
            <section className="py-20">
                <div className="section-container">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-12">
                            {t('pillars.heading')}
                        </h2>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {(['repair', 'longevity', 'materials'] as const).map((key, i) => (
                            <ScrollReveal key={key} direction="up" delay={i * 0.1}>
                                <div className="bg-panel rounded-2xl p-8 h-full flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold">{t(`pillars.${key}.title`)}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                        {t(`pillars.${key}.body`)}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Warranty commitment */}
            <section className="py-20 bg-dark-band">
                <div className="section-container max-w-2xl">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-4">
                            {t('warranty.heading')}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-8">
                            {t('warranty.body')}
                        </p>
                        <Button asChild variant="outline" size="lg">
                            <Link to="/account/register">{t('warranty.cta')}</Link>
                        </Button>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="section-container text-center">
                    <ScrollReveal direction="up">
                        <h2 className="display-heading text-3xl lg:text-4xl mb-4">{t('cta.heading')}</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t('cta.body')}</p>
                        <Button asChild size="lg">
                            <Link to="/about-us">{t('cta.button')}</Link>
                        </Button>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
