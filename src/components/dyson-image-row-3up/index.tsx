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
import { type Image } from '@/types';

/* v8 ignore start */
@Component('dysonImageRow3Up', {
    name: 'Dyson Image Row (3-up)',
    description:
        'Three equal-width images in a horizontal row, each with an optional caption. Used to showcase product angles, accessories, or lifestyle shots.',
    group: 'Dyson',
})
@RegionDefinition([])
// oxlint-disable-next-line react/only-export-components -- Page Designer metadata class must co-export with the component
export class DysonImageRow3UpMetadata {
    @AttributeDefinition({ name: 'Section Headline', required: false })
    headline?: string;

    @AttributeDefinition({ type: 'image', name: 'Image 1' })
    image1Url?: string;

    @AttributeDefinition({ name: 'Image 1 Alt Text' })
    image1Alt?: string;

    @AttributeDefinition({ name: 'Image 1 Caption', required: false })
    image1Caption?: string;

    @AttributeDefinition({ type: 'image', name: 'Image 2', required: false })
    image2Url?: string;

    @AttributeDefinition({ name: 'Image 2 Alt Text', required: false })
    image2Alt?: string;

    @AttributeDefinition({ name: 'Image 2 Caption', required: false })
    image2Caption?: string;

    @AttributeDefinition({ type: 'image', name: 'Image 3', required: false })
    image3Url?: string;

    @AttributeDefinition({ name: 'Image 3 Alt Text', required: false })
    image3Alt?: string;

    @AttributeDefinition({ name: 'Image 3 Caption', required: false })
    image3Caption?: string;
}
/* v8 ignore stop */

type ImageSlot = { url: Image; alt: string; caption?: string };

export default function DysonImageRow3Up({
    headline,
    image1Url,
    image1Alt,
    image1Caption,
    image2Url,
    image2Alt,
    image2Caption,
    image3Url,
    image3Alt,
    image3Caption,
}: {
    headline?: string;
    image1Url?: Image;
    image1Alt?: string;
    image1Caption?: string;
    image2Url?: Image;
    image2Alt?: string;
    image2Caption?: string;
    image3Url?: Image;
    image3Alt?: string;
    image3Caption?: string;
}): ReactElement | null {
    const slots: ImageSlot[] = [
        image1Url?.url && { url: image1Url, alt: image1Alt ?? '', caption: image1Caption },
        image2Url?.url && { url: image2Url, alt: image2Alt ?? '', caption: image2Caption },
        image3Url?.url && { url: image3Url, alt: image3Alt ?? '', caption: image3Caption },
    ].filter(Boolean) as ImageSlot[];

    if (slots.length === 0) return null;

    return (
        <section className="py-10 bg-background">
            <div className="container mx-auto section-container">
                {headline && (
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 text-center">
                        {headline}
                    </h2>
                )}
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
                    {slots.map((slot) => (
                        <li key={slot.url?.url || slot.alt} className="flex flex-col gap-2">
                            <div className="relative aspect-square overflow-hidden rounded-ui bg-accent">
                                <DynamicImage
                                    src={slot.url.url}
                                    alt={slot.alt}
                                    widths={['33vw', '100vw']}
                                    className="absolute inset-0 w-full h-full"
                                    imageProps={{ className: 'w-full h-full object-cover' }}
                                />
                            </div>
                            {slot.caption && (
                                <p className="text-xs text-muted-foreground text-center">{slot.caption}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
