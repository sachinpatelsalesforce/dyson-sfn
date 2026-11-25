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
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/link';

/* DEMO: FAQ content — all copy is placeholder, replace with real content */

export default function ProductFaq(): ReactElement {
    const { t } = useTranslation('pdpFaq');

    const items = [
        { q: t('q1'), a: t('a1') },
        { q: t('q2'), a: t('a2') },
        { q: t('q3'), a: t('a3') },
        { q: t('q4'), a: t('a4') },
        { q: t('q5'), a: t('a5') },
    ];

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="display-heading text-3xl lg:text-4xl text-center mb-10">
                {t('heading', 'Frequently Asked Questions')}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
                {items.map((item) => (
                    <AccordionItem key={item.q} value={item.q} className="rounded-2xl bg-panel border-0 px-5">
                        <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">
                            {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-5 space-y-3">
                            <p>{item.a}</p>
                            <Button asChild variant="outline" size="sm" className="rounded-full">
                                <Link to="/engineering">{t('learnMore', 'Learn more')}</Link>
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
