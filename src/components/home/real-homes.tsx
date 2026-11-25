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
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Link } from '@/components/link';

/* DEMO: customer home cards — placeholder colours, no invented specs */
const HOMES = [
    {
        key: 'london',
        city: 'London',
        quote: 'The laser picks up what I never saw before.',
        name: 'Sarah M.',
        bg: 'bg-[#1c2228]',
        accent: 'bg-[#2d3a46]',
        href: '/p/485296-01',
    },
    {
        key: 'manchester',
        city: 'Manchester',
        quote: 'Three cats, one Dyson. I win every time.',
        name: 'James K.',
        bg: 'bg-[#221c1c]',
        accent: 'bg-[#3a2d2d]',
        href: '/p/485296-01',
    },
    {
        key: 'edinburgh',
        city: 'Edinburgh',
        quote: 'Went back to the store once — to buy one for my mum.',
        name: 'Aileen T.',
        bg: 'bg-[#1c2219]',
        accent: 'bg-[#2d3a26]',
        href: '/p/485296-01',
    },
] as const;

export default function RealHomes() {
    const { t } = useTranslation('home');

    return (
        <section className="py-24 bg-background" aria-label={t('realHomes.ariaLabel', 'Real homes')}>
            <div className="section-container">
                <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        {/* DEMO copy */}
                        {t('realHomes.eyebrow', 'Real homes, real results')}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                    <h2 className="display-heading text-4xl lg:text-5xl text-foreground mb-14">
                        {/* DEMO copy */}
                        {t('realHomes.heading', 'From the people using it every day.')}
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {HOMES.map((home, i) => (
                        <ScrollReveal key={home.key} delay={i * 0.1}>
                            <Link to={home.href} className="block group">
                                <div
                                    className={`${home.bg} rounded-2xl p-8 h-full flex flex-col justify-between gap-8 transition-transform duration-500 group-hover:scale-[1.02]`}>
                                    {/* Decorative swatch */}
                                    <div className={`${home.accent} w-12 h-12 rounded-xl`} aria-hidden="true" />

                                    <div>
                                        <p className="text-xl text-dark-band-foreground leading-relaxed mb-6 italic">
                                            {/* DEMO copy */}
                                            &ldquo;{t(`realHomes.${home.key}.quote`, home.quote)}&rdquo;
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-dark-band-foreground">
                                                    {t(`realHomes.${home.key}.name`, home.name)}
                                                </p>
                                                <p className="text-xs text-dark-band-foreground/50">
                                                    {t(`realHomes.${home.key}.city`, home.city)}
                                                </p>
                                            </div>
                                            <span
                                                className="text-dark-band-foreground/40 group-hover:text-dark-band-foreground transition-colors"
                                                aria-hidden="true">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
