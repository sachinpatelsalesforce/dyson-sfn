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
import { Zap, Ruler, Wind, Smartphone, Battery, ShieldCheck, Package, type LucideIcon } from 'lucide-react';
import type { ShopperProducts } from '@/scapi';
import { cn } from '@/lib/utils';

type DysonSpecAttrs = {
    c_specDimensions?: string;
    c_specInBox?: string;
    c_specCompatibility?: string;
    c_specPower?: string;
    c_specFilter?: string;
    c_specWarranty?: string;
    c_boxContents?: string;
    c_suctionAW?: number;
    c_runTimeMin?: number;
    c_weightKg?: number;
    c_filtrationPct?: number;
};

interface SpecGroup {
    id: string;
    label: string;
    Icon: LucideIcon;
    lines: string[];
}

interface TechSpecsPanelProps {
    product: ShopperProducts.schemas['Product'];
    imageUrl?: string;
    className?: string;
}

function splitSpec(value: string): string[] {
    return value
        .split(/[\n;]/)
        .map((s) => s.trim())
        .filter(Boolean);
}

export default function TechSpecsPanel({
    product,
    imageUrl,
    className,
}: TechSpecsPanelProps): React.ReactElement | null {
    const { t } = useTranslation('product');
    const p = product as ShopperProducts.schemas['Product'] & DysonSpecAttrs;

    // Performance lines from numeric attrs
    const perfLines: string[] = [];
    if (typeof p.c_suctionAW === 'number') perfLines.push(`${p.c_suctionAW} AW suction`);
    if (typeof p.c_runTimeMin === 'number') perfLines.push(`Up to ${p.c_runTimeMin} min run time`);
    if (typeof p.c_filtrationPct === 'number') perfLines.push(`${p.c_filtrationPct}% filtration efficiency`);

    // Dimensions + weight
    const dimLines: string[] = typeof p.c_specDimensions === 'string' ? splitSpec(p.c_specDimensions) : [];
    if (typeof p.c_weightKg === 'number') dimLines.push(`${p.c_weightKg} kg`);

    const groups: SpecGroup[] = [];
    if (perfLines.length > 0) {
        groups.push({
            id: 'performance',
            label: t('dyson.techSpecs.performance', 'Performance'),
            Icon: Zap,
            lines: perfLines,
        });
    }
    if (dimLines.length > 0) {
        groups.push({
            id: 'dimensions',
            label: t('dyson.techSpecs.weightDimensions', 'Weight & Dimensions'),
            Icon: Ruler,
            lines: dimLines,
        });
    }
    if (typeof p.c_specFilter === 'string') {
        const lines = splitSpec(p.c_specFilter);
        if (lines.length > 0)
            groups.push({ id: 'filtration', label: t('dyson.techSpecs.filter', 'Filtration'), Icon: Wind, lines });
    }
    if (typeof p.c_specCompatibility === 'string') {
        const lines = splitSpec(p.c_specCompatibility);
        if (lines.length > 0)
            groups.push({
                id: 'compatibility',
                label: t('dyson.techSpecs.compatibility', 'Compatibility'),
                Icon: Smartphone,
                lines,
            });
    }
    if (typeof p.c_specPower === 'string') {
        const lines = splitSpec(p.c_specPower);
        if (lines.length > 0)
            groups.push({ id: 'power', label: t('dyson.techSpecs.power', 'Power'), Icon: Battery, lines });
    }
    if (typeof p.c_specWarranty === 'string') {
        const lines = splitSpec(p.c_specWarranty);
        if (lines.length > 0)
            groups.push({
                id: 'warranty',
                label: t('dyson.techSpecs.warrantyDetail', 'Warranty'),
                Icon: ShieldCheck,
                lines,
            });
    }

    const rawIncluded = p.c_specInBox ?? p.c_boxContents;
    const includedItems: string[] = typeof rawIncluded === 'string' ? splitSpec(rawIncluded) : [];

    if (groups.length === 0 && !imageUrl && includedItems.length === 0) return null;

    return (
        <section className={cn('section-container py-16', className)}>
            <div className="rounded-3xl bg-muted/10 p-8 lg:p-12">
                <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                    {/* Left: image + what's included */}
                    <div className="space-y-6">
                        {imageUrl && (
                            <div className="rounded-2xl overflow-hidden bg-panel aspect-square flex items-center justify-center">
                                <img
                                    src={imageUrl}
                                    alt={product.name ?? ''}
                                    className="w-full h-full object-contain p-6"
                                />
                            </div>
                        )}
                        {includedItems.length > 0 && (
                            <div className="rounded-2xl bg-panel p-5 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Package className="size-4 text-muted-foreground" aria-hidden="true" />
                                    <p className="font-medium text-sm">
                                        {t('dyson.techSpecs.inBox', "What's Included")}
                                    </p>
                                </div>
                                <ul className="space-y-1">
                                    {includedItems.map((item) => (
                                        <li key={item} className="text-xs text-muted-foreground">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right: heading + spec groups grid */}
                    <div>
                        <h2 className="display-heading text-3xl lg:text-4xl mb-8">
                            {t('dyson.techSpecs.heading', 'Technical Specifications')}
                        </h2>
                        {groups.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {groups.map((group) => (
                                    <div key={group.id} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="size-8 rounded-full border border-muted flex items-center justify-center shrink-0">
                                                <group.Icon
                                                    className="size-4 text-muted-foreground"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="font-medium text-sm">{group.label}</p>
                                        </div>
                                        <ul className="pl-10 space-y-1">
                                            {group.lines.map((line) => (
                                                <li
                                                    key={line}
                                                    className="text-xs text-muted-foreground leading-relaxed">
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                {t(
                                    'dyson.techSpecs.noSpecs',
                                    'Detailed specifications are not available for this product.'
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
