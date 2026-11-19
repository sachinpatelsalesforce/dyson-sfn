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
import { ScrollReveal } from '@/components/motion/scroll-reveal';

export default function StatementBand() {
    const { t } = useTranslation('home');

    return (
        <section className="py-24 lg:py-32 bg-background" aria-label={t('statement.ariaLabel', 'Statement')}>
            <div className="section-container text-center">
                <div className="max-w-2xl mx-auto">
                    <ScrollReveal delay={0}>
                        {/* DEMO copy */}
                        <h2 className="display-heading text-4xl lg:text-6xl mb-6 text-foreground">
                            {t('statement.heading', "See what you've been missing.")}
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        {/* DEMO copy */}
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                            {t(
                                'statement.body',
                                "Every surface. Every particle. Dyson's machines see the invisible so you don't have to."
                            )}
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button asChild variant="secondary" size="lg">
                                <a href="#engineering">{t('statement.ctaWhy', 'Why Dyson')}</a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="#inside-machine">{t('statement.ctaHow', 'How it works')}</a>
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
