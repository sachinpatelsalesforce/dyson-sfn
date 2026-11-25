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
/* oxlint-disable custom/color-linter -- Hotspot uses explicit black/white colors on photographic background */
import { useTranslation } from 'react-i18next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import cleanerHeadExploded from '/images/cleaner-head-exploded.png';

/* DEMO: hotspot positions mapped to the exploded High Torque cleaner head diagram */
const HOTSPOTS = [
    {
        key: 'housing',
        x: '46%',
        y: '21%',
        title: 'Clear protective cover',
        body: 'Polycarbonate shell lets you spot blockages instantly. Quarter-turn removal — no tools required.',
    },
    {
        key: 'comb',
        x: '62%',
        y: '33%',
        title: 'Anti-tangle comb',
        body: '316 precision-moulded teeth continuously separate hair from the roller, so the brush bar stays clear between cleans.',
    },
    {
        key: 'roller',
        x: '36%',
        y: '46%',
        title: 'High Torque woven roller',
        body: 'Stiffened nylon tufts pull hair into the head while carbon fibre filaments sweep fine dust from hard floors — in a single pass.',
    },
    {
        key: 'gearbox',
        x: '64%',
        y: '54%',
        title: 'Precision gearbox & motor',
        body: 'An 11-stage planetary gearbox drives the roller directly — no belt — eliminating stretch, wear, and energy loss.',
    },
    {
        key: 'airway',
        x: '34%',
        y: '65%',
        title: 'Shaped airflow channel',
        body: 'The curved blue chassis maximises fluid dynamics across the full head width, drawing particles in from edge to edge.',
    },
    {
        key: 'chassis',
        x: '52%',
        y: '79%',
        title: 'Low-profile chassis',
        body: 'The 20% thinner profile reaches deeper under furniture without compromising suction or airflow path.',
    },
] as const;

const PRODUCT_IMAGE = cleanerHeadExploded;

export default function HotspotDiagram() {
    const { t } = useTranslation('home');

    return (
        <section
            className="py-24 bg-panel overflow-hidden"
            id="inside-machine"
            aria-label={t('hotspot.ariaLabel', 'Inside the machine')}>
            <div className="section-container">
                <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-center">
                    {/* Left: text */}
                    <div className="mb-12 lg:mb-0">
                        <ScrollReveal>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                {t('hotspot.eyebrow', 'Engineering, explained')}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.05}>
                            <h2 className="display-heading text-4xl lg:text-5xl text-foreground mb-6">
                                {t('hotspot.heading', 'Every detail, deliberate.')}
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                {t(
                                    'hotspot.subhead',
                                    'Six precision components. One seamless system. Tap any hotspot to explore the engineering inside the High Torque cleaner head.'
                                )}
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Right: diagram */}
                    <ScrollReveal delay={0.15}>
                        <div className="relative max-w-sm mx-auto lg:max-w-none">
                            {/* Rounded image frame */}
                            <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/8 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)] bg-[#0d0d0d]">
                                <img
                                    src={PRODUCT_IMAGE}
                                    alt={t(
                                        'hotspot.imageAlt',
                                        'Exploded view of Dyson High Torque cleaner head showing all internal components'
                                    )}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                    width={900}
                                    height={1125}
                                />

                                {HOTSPOTS.map((spot) => (
                                    <Popover key={spot.key}>
                                        <PopoverTrigger
                                            style={{ left: spot.x, top: spot.y }}
                                            className="absolute -translate-x-1/2 -translate-y-1/2 group"
                                            aria-label={t(`hotspot.${spot.key}.title`, spot.title)}>
                                            {/* Pulse ring */}
                                            <span
                                                className="absolute inset-0 scale-150 rounded-full bg-white/20 animate-ping group-data-[state=open]:animate-none"
                                                aria-hidden="true"
                                            />
                                            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-black text-sm font-semibold shadow-[0_0_0_2px_rgba(255,255,255,0.15)] backdrop-blur-sm transition-transform group-hover:scale-110 group-data-[state=open]:scale-110">
                                                +
                                            </span>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="right"
                                            sideOffset={10}
                                            className="w-64 bg-card/95 backdrop-blur-md border-white/10 p-4 shadow-2xl">
                                            <h3 className="font-semibold text-sm text-foreground mb-1.5">
                                                {t(`hotspot.${spot.key}.title`, spot.title)}
                                            </h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {t(`hotspot.${spot.key}.body`, spot.body)}
                                            </p>
                                        </PopoverContent>
                                    </Popover>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
