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
import { motion, useReducedMotion } from 'motion/react';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

/* DEMO: proof stats — do not invent real product specs */
const STATS = [
    { key: 'hepa', value: '99.99%', label: 'of particles captured' },
    { key: 'watts', value: '220AW', label: 'of suction power' },
    { key: 'modes', value: '5', label: 'cleaning modes' },
    { key: 'run', value: '60min', label: 'run time' },
] as const;

export default function ProofBand() {
    const { t } = useTranslation('home');
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="py-20 lg:py-28 bg-dark-band" aria-label={t('proof.ariaLabel', 'Proof band')}>
            <div className="section-container">
                {/* Lead statement */}
                <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.2em] text-dark-band-foreground/40 mb-4">
                        {/* DEMO copy */}
                        {t('proof.eyebrow', 'By the numbers')}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                    <h2 className="display-heading text-4xl lg:text-6xl text-dark-band-foreground mb-16 max-w-2xl">
                        {/* DEMO copy */}
                        {t('proof.heading', "Nothing escapes it.")}
                    </h2>
                </ScrollReveal>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-dark-band-foreground/10 border border-dark-band-foreground/10 rounded-2xl overflow-hidden">
                    {STATS.map((stat, i) => (
                        <ScrollReveal key={stat.key} delay={i * 0.08} className="bg-dark-band p-8 lg:p-10">
                            <motion.p
                                className="display-heading text-5xl lg:text-6xl text-dark-band-foreground mb-2"
                                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}>
                                {/* DEMO data */}
                                {t(`proof.stat.${stat.key}.value`, stat.value)}
                            </motion.p>
                            <p className="text-sm text-dark-band-foreground/50">
                                {t(`proof.stat.${stat.key}.label`, stat.label)}
                            </p>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Legal footnote — DEMO */}
                <p className="mt-6 text-xs text-dark-band-foreground/30">
                    {t('proof.footnote', '* Based on ASTM F1977 test method using 0.3 micron particles.')}
                </p>
            </div>
        </section>
    );
}
