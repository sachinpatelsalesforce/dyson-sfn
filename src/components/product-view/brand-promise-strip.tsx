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
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface BrandPromiseStripProps {
    className?: string;
}

export default function BrandPromiseStrip({ className }: BrandPromiseStripProps): React.ReactElement {
    const { t } = useTranslation('product');

    const promises = [
        {
            Icon: ShieldCheck,
            heading: t('dyson.promise.warranty'),
            desc: t('dyson.promise.warrantyDesc'),
        },
        {
            Icon: Truck,
            heading: t('dyson.promise.delivery'),
            desc: t('dyson.promise.deliveryDesc'),
        },
        {
            Icon: RotateCcw,
            heading: t('dyson.promise.returns'),
            desc: t('dyson.promise.returnsDesc'),
        },
    ] as const;

    return (
        <section
            className={cn(
                'mt-12 border-t border-border pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center',
                className
            )}
            aria-label="Dyson Promise">
            {promises.map(({ Icon, heading, desc }) => (
                <div key={heading} className="flex flex-col items-center gap-2">
                    <Icon className="size-8 text-primary" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">{heading}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
            ))}
        </section>
    );
}
