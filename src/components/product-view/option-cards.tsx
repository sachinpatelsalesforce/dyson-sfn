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
import { useState, type ReactElement } from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* DEMO: Static tool set options — no real catalog bundle data needed */

type ToolSet = 'standard' | 'complete';

interface OptionCardProps {
    value: ToolSet;
    selected: boolean;
    title: string;
    desc: string;
    price: string;
}

function OptionCard({ value, selected, title, desc, price }: OptionCardProps): ReactElement {
    return (
        <label
            htmlFor={`tool-set-${value}`}
            className={cn(
                'relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors',
                selected ? 'border-foreground bg-muted/20' : 'border-muted hover:border-muted-foreground/40'
            )}>
            <RadioGroupItem id={`tool-set-${value}`} value={value} className="sr-only" />
            <div className="mt-0.5 shrink-0">
                <CheckCircle2
                    className={cn(
                        'size-5 transition-colors',
                        selected ? 'text-primary fill-primary' : 'text-muted-foreground'
                    )}
                    aria-hidden="true"
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-muted-foreground self-start">{price}</span>
        </label>
    );
}

/* DEMO: Compare dialog table rows */
const COMPARE_ROWS = [
    { tool: 'Crevice tool', standard: true, complete: true },
    { tool: 'Combination tool', standard: true, complete: true },
    { tool: 'Hair screw tool', standard: false, complete: true },
    { tool: 'Stubborn dirt brush', standard: false, complete: true },
    { tool: 'Flexi crevice tool', standard: false, complete: true },
];

export default function OptionCards(): ReactElement {
    const { t } = useTranslation('product');
    const [selected, setSelected] = useState<ToolSet>('standard');
    const [demoSent, setDemoSent] = useState(false);

    return (
        <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t('dyson.optionCards.heading', 'Choose your set')}</p>
                {/* Compare dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={t('dyson.optionCards.compareTitle', "What's included")}>
                            <Info className="size-3.5" aria-hidden="true" />
                            {t('dyson.optionCards.compareTitle', "What's included")}
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('dyson.optionCards.compareTitle', "What's included")} — DEMO</DialogTitle>
                        </DialogHeader>
                        <table className="w-full text-sm mt-2">
                            <thead>
                                <tr className="border-b border-muted">
                                    <th className="text-left pb-2 font-medium">Tool</th>
                                    <th className="text-center pb-2 font-medium">Standard</th>
                                    <th className="text-center pb-2 font-medium">Complete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE_ROWS.map((row) => (
                                    <tr key={row.tool} className="border-b border-muted/40">
                                        <td className="py-2 text-muted-foreground">{row.tool}</td>
                                        <td className="py-2 text-center">{row.standard ? '✓' : '—'}</td>
                                        <td className="py-2 text-center">{row.complete ? '✓' : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DialogContent>
                </Dialog>
            </div>

            <RadioGroup value={selected} onValueChange={(v) => setSelected(v as ToolSet)} className="space-y-2">
                <OptionCard
                    value="standard"
                    selected={selected === 'standard'}
                    title={t('dyson.optionCards.standard.title', 'Standard tools')}
                    desc={t('dyson.optionCards.standard.desc', 'Machine + Crevice tool + Combination tool. DEMO.')}
                    price={t('dyson.optionCards.standard.price', 'Included')}
                />
                <OptionCard
                    value="complete"
                    selected={selected === 'complete'}
                    title={t('dyson.optionCards.complete.title', 'Complete tool set')}
                    desc={t(
                        'dyson.optionCards.complete.desc',
                        'Everything in Standard, plus the Hair screw tool, Stubborn dirt brush, and Flexi crevice tool. DEMO.'
                    )}
                    price={t('dyson.optionCards.complete.priceDelta', '+£X DEMO')}
                />
            </RadioGroup>

            {/* Book a free home demo dialog — DEMO, no data sent */}
            <Dialog
                onOpenChange={(open) => {
                    if (!open) setDemoSent(false);
                }}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors mt-1">
                        {t('dyson.optionCards.demoTitle', 'Book a free home demo')}
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('dyson.optionCards.demoTitle', 'Book a free home demo')}</DialogTitle>
                    </DialogHeader>
                    {demoSent ? (
                        <p className="text-sm text-muted-foreground py-4">
                            {t('dyson.optionCards.demoSuccess', "Thanks! We'll be in touch. DEMO — no data sent.")}
                        </p>
                    ) : (
                        /* DEMO form — no data sent */
                        <form
                            className="space-y-4 mt-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setDemoSent(true);
                            }}>
                            <p className="text-xs text-muted-foreground">
                                {t(
                                    'dyson.optionCards.demoDesc',
                                    'DEMO: One of our experts will visit your home and show you the full range.'
                                )}
                            </p>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="w-full rounded-lg border border-muted bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    className="w-full rounded-lg border border-muted bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                                <input
                                    type="text"
                                    placeholder="Postcode"
                                    required
                                    className="w-full rounded-lg border border-muted bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {t('dyson.optionCards.demoSubmit', 'Request a demo')}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
