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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollReveal } from '@/components/motion/scroll-reveal';

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

/* Exploded High Torque cleaner head — static public asset */
const PRODUCT_IMAGE = '/images/cleaner-head-exploded.png';

export default function HotspotDiagram() {
    const { t } = useTranslation('home');

    return (
        <section className="py-24 bg-panel" id="inside-machine" aria-label={t('hotspot.ariaLabel', 'Inside the machine')}>
            <div className="section-container">
                <ScrollReveal>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        {/* DEMO copy */}
                        {t('hotspot.eyebrow', 'Engineering, explained')}
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.05}>
                    <h2 className="display-heading text-4xl lg:text-5xl text-foreground mb-14 max-w-xl">
                        {/* DEMO copy */}
                        {t('hotspot.heading', "Every detail, deliberate.")}
                    </h2>
                </ScrollReveal>

                {/* Diagram */}
                <div className="relative max-w-xl mx-auto">
                    <img
                        src={PRODUCT_IMAGE}
                        alt={t('hotspot.imageAlt', 'Exploded view of Dyson High Torque cleaner head showing all internal components')}
                        className="w-full h-auto"
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
                                    className="absolute inset-0 rounded-full bg-foreground/20 animate-ping group-data-[state=open]:animate-none"
                                    aria-hidden="true"
                                />
                                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold shadow-lg">
                                    +
                                </span>
                            </PopoverTrigger>
                            <PopoverContent
                                side="top"
                                sideOffset={8}
                                className="w-64 bg-card border-border p-4 shadow-xl">
                                <h3 className="font-medium text-sm text-foreground mb-1">
                                    {/* DEMO copy */}
                                    {t(`hotspot.${spot.key}.title`, spot.title)}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {/* DEMO copy */}
                                    {t(`hotspot.${spot.key}.body`, spot.body)}
                                </p>
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            </div>
        </section>
    );
}
