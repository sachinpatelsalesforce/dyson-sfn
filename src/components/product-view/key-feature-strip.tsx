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
import { type LucideIcon, Wind, Filter, ShieldCheck, Zap, Leaf, Volume2, Star, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ShopperProducts } from '@/scapi';
import { cn } from '@/lib/utils';

interface KeyFeatureStripProps {
    product: ShopperProducts.schemas['Product'];
    className?: string;
}

const ICON_MAP: { keywords: string[]; Icon: LucideIcon }[] = [
    { keywords: ['filter', 'filtration', 'hepa', 'allergen', 'capture'], Icon: Filter },
    { keywords: ['suction', 'power', 'aw', 'watt'], Icon: Zap },
    { keywords: ['cyclone', 'airflow', 'airspeed', 'wind'], Icon: Wind },
    { keywords: ['quiet', 'acoustic', 'noise', 'sound', 'silent'], Icon: Volume2 },
    { keywords: ['eco', 'green', 'energy', 'environment'], Icon: Leaf },
    { keywords: ['protect', 'safe', 'secure', 'warranty', 'certif'], Icon: ShieldCheck },
    { keywords: ['award', 'best', 'premium', 'rated'], Icon: Star },
];

function iconForLabel(label: string): LucideIcon {
    const lower = label.toLowerCase();
    for (const { keywords, Icon } of ICON_MAP) {
        if (keywords.some((k) => lower.includes(k))) return Icon;
    }
    return CheckCircle;
}

export default function KeyFeatureStrip({ product, className }: KeyFeatureStripProps): React.ReactElement | null {
    const { t } = useTranslation('product');
    const raw = (product as Record<string, unknown>).c_c_filterTechnology;
    const features = Array.isArray(raw) ? (raw as string[]).slice(0, 4) : null;
    if (!features || features.length === 0) return null;

    return (
        <section className={cn('mt-8', className)} aria-label={t('dyson.keyFeatures')}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {t('dyson.keyFeatures')}
            </h2>
            <ul className="flex flex-wrap gap-2" role="list">
                {features.map((label) => {
                    const Icon = iconForLabel(label);
                    return (
                        <li
                            key={label}
                            className="flex items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-foreground">
                            <Icon className="size-3.5 text-primary shrink-0" aria-hidden="true" />
                            {label}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
