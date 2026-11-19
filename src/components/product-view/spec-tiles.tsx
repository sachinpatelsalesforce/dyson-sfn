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
import type { ShopperProducts } from '@/scapi';
import { cn } from '@/lib/utils';

interface SpecTilesProps {
    product: ShopperProducts.schemas['Product'];
    className?: string;
}

/** Renders a segmented 1–3 level bar (each segment is a Dyson-green block). */
function LevelMeter({ level, label }: { level: number; label: string }): React.ReactElement {
    const clamped = Math.min(3, Math.max(1, Math.round(level)));
    return (
        <div
            className="flex gap-0.5 mt-1"
            role="meter"
            aria-valuenow={clamped}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={label}>
            {[1, 2, 3].map((i) => (
                <span key={i} className={cn('h-1.5 w-5 rounded-sm', i <= clamped ? 'bg-primary' : 'bg-accent')} />
            ))}
        </div>
    );
}

type SpecEntry = { label: string; value: number; unit: string; level?: number };

type DysonProductAttrs = {
    c_suctionAW?: number;
    c_suctionLevel?: number;
    c_runTimeMin?: number;
    c_runtimeLevel?: number;
    c_binVolumeL?: number;
    c_weightKg?: number;
    c_filtrationPct?: number;
    c_filtrationLevel?: number;
};

export default function SpecTiles({ product, className }: SpecTilesProps): React.ReactElement | null {
    const { t } = useTranslation('product');
    const p = product as ShopperProducts.schemas['Product'] & DysonProductAttrs;

    const candidates: SpecEntry[] = [
        {
            label: t('dyson.specs.suction'),
            value: p.c_suctionAW as number,
            unit: t('dyson.specs.suctionUnit'),
            level: typeof p.c_suctionLevel === 'number' ? p.c_suctionLevel : undefined,
        },
        {
            label: t('dyson.specs.runtime'),
            value: p.c_runTimeMin as number,
            unit: t('dyson.specs.runtimeUnit'),
            level: typeof p.c_runtimeLevel === 'number' ? p.c_runtimeLevel : undefined,
        },
        {
            label: t('dyson.specs.binVolume'),
            value: p.c_binVolumeL as number,
            unit: t('dyson.specs.binVolumeUnit'),
        },
        {
            label: t('dyson.specs.weight'),
            value: p.c_weightKg as number,
            unit: t('dyson.specs.weightUnit'),
        },
        {
            label: t('dyson.specs.filtration'),
            value: p.c_filtrationPct as number,
            unit: t('dyson.specs.filtrationUnit'),
            level: typeof p.c_filtrationLevel === 'number' ? p.c_filtrationLevel : undefined,
        },
    ];

    const entries = candidates.filter((e) => typeof e.value === 'number');
    if (entries.length === 0) return null;

    return (
        <section className={cn('mt-8', className)} aria-label={t('dyson.specs.title')}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {t('dyson.specs.title')}
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3" role="list">
                {entries.map((e) => (
                    <li key={e.label} className="rounded-ui border border-border bg-background p-3 flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {e.label}
                        </span>
                        <span className="mt-1 text-xl font-bold text-foreground leading-none">
                            {e.value}
                            <span className="text-sm font-normal text-muted-foreground ml-0.5">{e.unit}</span>
                        </span>
                        {typeof e.level === 'number' && <LevelMeter level={e.level} label={`${e.label} level`} />}
                    </li>
                ))}
            </ul>
        </section>
    );
}
