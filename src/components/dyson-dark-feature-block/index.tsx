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
import { cn } from '@/lib/utils';
import { type Image } from '@/types';

/* v8 ignore start */
@Component('dysonDarkFeatureBlock', {
    name: 'Dyson Dark Feature Block',
    description:
        'Two-column dark block: an image on one side and a headline + body text on the other. Can be flipped to put image on the right. Used to highlight a single product capability.',
    group: 'Dyson',
})
@RegionDefinition([])
export class DysonDarkFeatureBlockMetadata {
    @AttributeDefinition({ name: 'Headline' })
    headline?: string;

    @AttributeDefinition({ name: 'Body Text' })
    body?: string;

    @AttributeDefinition({ type: 'image', name: 'Feature Image' })
    imageUrl?: string;

    @AttributeDefinition({ name: 'Image Alt Text' })
    imageAlt?: string;

    @AttributeDefinition({
        name: 'Image Side',
        type: 'enum',
        values: ['left', 'right'],
        defaultValue: 'left',
    })
    imageSide?: string;

    @AttributeDefinition({ name: 'Stat Value', description: 'Large callout number (e.g. "99.97%")', required: false })
    statValue?: string;

    @AttributeDefinition({ name: 'Stat Label', required: false })
    statLabel?: string;
}
/* v8 ignore stop */

export default function DysonDarkFeatureBlock({
    headline,
    body,
    imageUrl,
    imageAlt,
    imageSide = 'left',
    statValue,
    statLabel,
}: {
    headline?: string;
    body?: string;
    imageUrl?: Image;
    imageAlt?: string;
    imageSide?: string;
    statValue?: string;
    statLabel?: string;
}): ReactElement {
    const imageFirst = imageSide !== 'right';

    return (
        <section className="bg-foreground text-background">
            <div
                className={cn(
                    'container mx-auto section-container grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch',
                    !imageFirst && 'md:[&>*:first-child]:order-2'
                )}>
                {/* Image pane */}
                <div className="relative min-h-[280px] md:min-h-[400px] overflow-hidden">
                    {imageUrl?.url ? (
                        <DynamicImage
                            src={imageUrl.url}
                            alt={imageAlt ?? ''}
                            widths={['50vw', '100vw']}
                            className="absolute inset-0 w-full h-full"
                            imageProps={{ className: 'w-full h-full object-cover' }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-muted/20" />
                    )}
                </div>

                {/* Text pane */}
                <div className="flex flex-col justify-center px-8 md:px-12 py-12 md:py-16">
                    {statValue && (
                        <p className="text-5xl font-bold text-primary leading-none mb-1">{statValue}</p>
                    )}
                    {statLabel && (
                        <p className="text-xs font-semibold uppercase tracking-widest text-background/60 mb-6">
                            {statLabel}
                        </p>
                    )}
                    {headline && (
                        <h2 className="text-2xl md:text-3xl font-bold text-background mb-4 leading-tight">{headline}</h2>
                    )}
                    {body && <p className="text-sm md:text-base text-background/70 leading-relaxed">{body}</p>}
                </div>
            </div>
        </section>
    );
}
