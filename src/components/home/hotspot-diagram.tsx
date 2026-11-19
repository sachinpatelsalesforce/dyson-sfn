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

/* DEMO: hotspot positions are illustrative — not real engineering data */
const HOTSPOTS = [
    {
        key: 'laser',
        x: '28%',
        y: '62%',
        title: 'Laser Slim Fluffy head',
        body: 'Green laser illuminates microscopic particles invisible to the naked eye.',
    },
    {
        key: 'filtration',
        x: '72%',
        y: '24%',
        title: 'Whole-machine HEPA filtration',
        body: 'Five-stage filtration captures 99.99% of particles down to 0.3 microns.',
    },
    {
        key: 'motor',
        x: '54%',
        y: '42%',
        title: 'Hyperdymium motor',
        body: 'Spins at up to 125,000rpm — generating powerful suction from a lightweight motor.',
    },
    {
        key: 'lcd',
        x: '62%',
        y: '68%',
        title: 'LCD screen',
        body: 'Real-time performance reporting: mode, run time, and filter life at a glance.',
    },
    {
        key: 'submarine',
        x: '18%',
        y: '36%',
        title: 'Submarine wet head',
        body: 'Self-cleaning roller washes and dries itself after every pass.',
    },
] as const;

/* DEMO product image — real product, correct SKU */
const PRODUCT_IMAGE =
    'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/485296-01.png';

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
                <div className="relative max-w-2xl mx-auto">
                    <img
                        src={PRODUCT_IMAGE}
                        alt={t('hotspot.imageAlt', 'Dyson V12s Detect Slim Submarine with feature callouts')}
                        className="w-full h-auto"
                        loading="lazy"
                        width={800}
                        height={600}
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
