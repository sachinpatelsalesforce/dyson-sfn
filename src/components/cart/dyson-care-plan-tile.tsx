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
import { ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from 'react-i18next';

/** DEMO tile — not wired to basket/SCAPI. Toggles locally only. */
export default function DysonCarePlanTile(): ReactElement {
    const { t } = useTranslation('cart');
    const [checked, setChecked] = useState(false);

    return (
        <div className="rounded-2xl bg-panel p-4 flex items-center gap-3">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5 self-start" aria-hidden="true" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{t('dyson.carePlan.title', 'Dyson Care+')}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {t('dyson.carePlan.desc', '3-year plan — accidental damage, parts & labour covered')}
                </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-sm font-medium tabular-nums">{t('dyson.carePlan.price', '+£39')}</span>
                <Switch
                    checked={checked}
                    onCheckedChange={setChecked}
                    aria-label={t('dyson.carePlan.label', 'Add Dyson Care+ plan')}
                />
            </div>
        </div>
    );
}
