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
import { type ReactElement } from 'react';
import { Component } from '@/lib/decorators/component';
import { AttributeDefinition } from '@/lib/decorators/attribute-definition';
import { RegionDefinition } from '@/lib/decorators';
import { DynamicImage } from '@/components/dynamic-image';
import { Link } from '@/components/link';
import { type Image } from '@/types';

/* v8 ignore start */
@Component('dysonColourShowcase', {
    name: 'Dyson Colour Showcase',
    description:
        'Grid of colour variants: each swatch shows a product image in that colourway with the variant name below. Up to 4 swatches. Used on PDP pages to visually surface colourway options.',
    group: 'Dyson',
})
@RegionDefinition([])
export class DysonColourShowcaseMetadata {
    @AttributeDefinition({ name: 'Section Headline', required: false })
    headline?: string;

    @AttributeDefinition({ name: 'Variant 1 Name' })
    variant1Name?: string;

    @AttributeDefinition({ type: 'image', name: 'Variant 1 Image' })
    variant1Image?: string;

    @AttributeDefinition({ type: 'url', name: 'Variant 1 Link', required: false })
    variant1Link?: string;

    @AttributeDefinition({ name: 'Variant 2 Name', required: false })
    variant2Name?: string;

    @AttributeDefinition({ type: 'image', name: 'Variant 2 Image', required: false })
    variant2Image?: string;

    @AttributeDefinition({ type: 'url', name: 'Variant 2 Link', required: false })
    variant2Link?: string;

    @AttributeDefinition({ name: 'Variant 3 Name', required: false })
    variant3Name?: string;

    @AttributeDefinition({ type: 'image', name: 'Variant 3 Image', required: false })
    variant3Image?: string;

    @AttributeDefinition({ type: 'url', name: 'Variant 3 Link', required: false })
    variant3Link?: string;

    @AttributeDefinition({ name: 'Variant 4 Name', required: false })
    variant4Name?: string;

    @AttributeDefinition({ type: 'image', name: 'Variant 4 Image', required: false })
    variant4Image?: string;

    @AttributeDefinition({ type: 'url', name: 'Variant 4 Link', required: false })
    variant4Link?: string;
}
/* v8 ignore stop */

type Variant = { name: string; image: Image; link?: string };

export default function DysonColourShowcase({
    headline,
    variant1Name,
    variant1Image,
    variant1Link,
    variant2Name,
    variant2Image,
    variant2Link,
    variant3Name,
    variant3Image,
    variant3Link,
    variant4Name,
    variant4Image,
    variant4Link,
}: {
    headline?: string;
    variant1Name?: string;
    variant1Image?: Image;
    variant1Link?: string;
    variant2Name?: string;
    variant2Image?: Image;
    variant2Link?: string;
    variant3Name?: string;
    variant3Image?: Image;
    variant3Link?: string;
    variant4Name?: string;
    variant4Image?: Image;
    variant4Link?: string;
}): ReactElement | null {
    const variants: Variant[] = [
        variant1Name && variant1Image?.url && { name: variant1Name, image: variant1Image, link: variant1Link },
        variant2Name && variant2Image?.url && { name: variant2Name, image: variant2Image, link: variant2Link },
        variant3Name && variant3Image?.url && { name: variant3Name, image: variant3Image, link: variant3Link },
        variant4Name && variant4Image?.url && { name: variant4Name, image: variant4Image, link: variant4Link },
    ].filter(Boolean) as Variant[];

    if (variants.length === 0) return null;

    return (
        <section className="py-10 bg-background">
            <div className="container mx-auto section-container">
                {headline && (
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                        {headline}
                    </h2>
                )}
                <ul className="flex flex-wrap gap-4" role="list">
                    {variants.map((v) => {
                        const inner = (
                            <>
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors bg-accent mb-2">
                                    <DynamicImage
                                        src={v.image.url}
                                        alt={v.name}
                                        widths={['64px']}
                                        className="absolute inset-0 w-full h-full"
                                        imageProps={{ className: 'w-full h-full object-cover' }}
                                    />
                                </div>
                                <p className="text-[10px] font-medium text-center text-foreground">{v.name}</p>
                            </>
                        );

                        return (
                            <li key={v.name} className="flex flex-col items-center w-20">
                                {v.link ? (
                                    <Link to={v.link} className="group flex flex-col items-center">
                                        {inner}
                                    </Link>
                                ) : (
                                    <div className="group flex flex-col items-center">{inner}</div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
