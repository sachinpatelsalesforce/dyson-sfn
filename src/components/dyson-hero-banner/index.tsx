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
import { Button } from '@/components/ui/button';
import { Link } from '@/components/link';
import { type Image } from '@/types';

/* v8 ignore start */
@Component('dysonHeroBanner', {
    name: 'Dyson Hero Banner',
    description:
        'Full-bleed product hero with a headline, sub-copy, and optional CTA. Dark background with white text. Designed for above-the-fold PDP placement.',
    group: 'Dyson',
})
@RegionDefinition([])
// oxlint-disable-next-line react/only-export-components -- Page Designer metadata class must co-export with the component
export class DysonHeroBannerMetadata {
    @AttributeDefinition({ name: 'Headline' })
    headline?: string;

    @AttributeDefinition({ name: 'Sub-copy' })
    subCopy?: string;

    @AttributeDefinition({ type: 'image', name: 'Background Image' })
    imageUrl?: string;

    @AttributeDefinition({ name: 'Image Alt Text' })
    imageAlt?: string;

    @AttributeDefinition({ name: 'CTA Text' })
    ctaText?: string;

    @AttributeDefinition({ type: 'url', name: 'CTA Link', required: false })
    ctaLink?: string;

    @AttributeDefinition({
        name: 'Eyebrow Tag',
        description: 'Short tag line displayed above the headline (e.g. "New" or "Award-winning")',
        required: false,
    })
    eyebrow?: string;
}
/* v8 ignore stop */

export default function DysonHeroBanner({
    headline,
    subCopy,
    imageUrl,
    imageAlt,
    ctaText,
    ctaLink,
    eyebrow,
}: {
    headline?: string;
    subCopy?: string;
    imageUrl?: Image;
    imageAlt?: string;
    ctaText?: string;
    ctaLink?: string;
    eyebrow?: string;
}): ReactElement {
    const hasImage = Boolean(imageUrl?.url);
    const hasCta = Boolean(ctaLink?.trim());

    return (
        <section className="relative w-full overflow-hidden bg-foreground text-background min-h-[420px] md:min-h-[520px] flex items-end">
            {hasImage && (
                <DynamicImage
                    src={(imageUrl as Image).url}
                    alt={imageAlt ?? ''}
                    widths={['100vw']}
                    priority="high"
                    className="absolute inset-0 w-full h-full"
                    imageProps={{ className: 'w-full h-full object-cover opacity-60' }}
                />
            )}
            <div className="relative z-10 container mx-auto section-container py-12 md:py-16 max-w-2xl mr-auto">
                {eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{eyebrow}</p>
                )}
                {headline && <h2 className="text-4xl md:text-5xl font-bold leading-none mb-4">{headline}</h2>}
                {subCopy && <p className="text-base md:text-lg text-background/80 mb-6 max-w-md">{subCopy}</p>}
                {hasCta && (
                    <Button
                        asChild
                        variant="default"
                        className="bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link to={ctaLink as string}>{ctaText ?? 'Explore'}</Link>
                    </Button>
                )}
            </div>
        </section>
    );
}
