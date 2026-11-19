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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface TechSpecsAccordionProps {
    product: ShopperProducts.schemas['Product'];
    className?: string;
}

type DysonSpecAttrs = {
    c_specDimensions?: string;
    c_specInBox?: string;
    c_specCompatibility?: string;
    c_specPower?: string;
    c_specFilter?: string;
    c_specWarranty?: string;
    c_boxContents?: string;
};

type Section = { id: string; label: string; content: string };

export default function TechSpecsAccordion({ product, className }: TechSpecsAccordionProps): React.ReactElement | null {
    const { t } = useTranslation('product');
    const p = product as ShopperProducts.schemas['Product'] & DysonSpecAttrs;

    // Pre-compute labels — avoids dynamic t(key) calls that TypeScript cannot type-check
    const sections: Section[] = [
        product.longDescription &&
            product.longDescription !== product.shortDescription && {
                id: 'overview',
                label: t('dyson.techSpecs.overview'),
                content: product.longDescription,
            },
        typeof p.c_specDimensions === 'string' && {
            id: 'dimensions',
            label: t('dimensions'),
            content: p.c_specDimensions,
        },
        typeof p.c_specInBox === 'string' && {
            id: 'in-box',
            label: t('dyson.techSpecs.inBox'),
            content: p.c_specInBox,
        },
        typeof p.c_specCompatibility === 'string' && {
            id: 'compatibility',
            label: t('dyson.techSpecs.compatibility'),
            content: p.c_specCompatibility,
        },
        typeof p.c_specPower === 'string' && {
            id: 'power',
            label: t('dyson.techSpecs.power'),
            content: p.c_specPower,
        },
        typeof p.c_specFilter === 'string' && {
            id: 'filter',
            label: t('dyson.techSpecs.filter'),
            content: p.c_specFilter,
        },
        typeof p.c_specWarranty === 'string' && {
            id: 'warranty',
            label: t('dyson.techSpecs.warrantyDetail'),
            content: p.c_specWarranty,
        },
        typeof p.c_boxContents === 'string' && {
            id: 'box-contents',
            label: t('dyson.techSpecs.boxContents'),
            content: p.c_boxContents,
        },
    ].filter(Boolean) as Section[];

    if (sections.length === 0) return null;

    return (
        <section className={cn('mt-8', className)}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {t('dyson.techSpecs.title')}
            </h2>
            <Accordion type="multiple" className="w-full">
                {sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger headingLevel={3}>{section.label}</AccordionTrigger>
                        <AccordionContent>
                            <div
                                className="prose prose-sm max-w-none text-muted-foreground"
                                /* sanitisation is the upstream concern; product.longDescription comes from SFCC */
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
