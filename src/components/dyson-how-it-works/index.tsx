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
@Component('dysonHowItWorks', {
    name: 'Dyson How It Works',
    description:
        'Numbered step-by-step diagram: up to 4 steps each with an icon/image, a step number, a title, and a description. Used to explain product mechanics.',
    group: 'Dyson',
})
@RegionDefinition([])
export class DysonHowItWorksMetadata {
    @AttributeDefinition({ name: 'Section Headline', required: false })
    headline?: string;

    @AttributeDefinition({ name: 'Step 1 Title' })
    step1Title?: string;

    @AttributeDefinition({ name: 'Step 1 Description' })
    step1Desc?: string;

    @AttributeDefinition({ type: 'image', name: 'Step 1 Image', required: false })
    step1Image?: string;

    @AttributeDefinition({ name: 'Step 2 Title', required: false })
    step2Title?: string;

    @AttributeDefinition({ name: 'Step 2 Description', required: false })
    step2Desc?: string;

    @AttributeDefinition({ type: 'image', name: 'Step 2 Image', required: false })
    step2Image?: string;

    @AttributeDefinition({ name: 'Step 3 Title', required: false })
    step3Title?: string;

    @AttributeDefinition({ name: 'Step 3 Description', required: false })
    step3Desc?: string;

    @AttributeDefinition({ type: 'image', name: 'Step 3 Image', required: false })
    step3Image?: string;

    @AttributeDefinition({ name: 'Step 4 Title', required: false })
    step4Title?: string;

    @AttributeDefinition({ name: 'Step 4 Description', required: false })
    step4Desc?: string;

    @AttributeDefinition({ type: 'image', name: 'Step 4 Image', required: false })
    step4Image?: string;
}
/* v8 ignore stop */

type Step = { title: string; desc?: string; image?: Image; num: number };

export default function DysonHowItWorks({
    headline,
    step1Title,
    step1Desc,
    step1Image,
    step2Title,
    step2Desc,
    step2Image,
    step3Title,
    step3Desc,
    step3Image,
    step4Title,
    step4Desc,
    step4Image,
}: {
    headline?: string;
    step1Title?: string;
    step1Desc?: string;
    step1Image?: Image;
    step2Title?: string;
    step2Desc?: string;
    step2Image?: Image;
    step3Title?: string;
    step3Desc?: string;
    step3Image?: Image;
    step4Title?: string;
    step4Desc?: string;
    step4Image?: Image;
}): ReactElement | null {
    const steps: Step[] = [
        step1Title && { title: step1Title, desc: step1Desc, image: step1Image, num: 1 },
        step2Title && { title: step2Title, desc: step2Desc, image: step2Image, num: 2 },
        step3Title && { title: step3Title, desc: step3Desc, image: step3Image, num: 3 },
        step4Title && { title: step4Title, desc: step4Desc, image: step4Image, num: 4 },
    ].filter(Boolean) as Step[];

    if (steps.length === 0) return null;

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto section-container">
                {headline && (
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8 text-center">
                        {headline}
                    </h2>
                )}
                <ol
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    role="list"
                    aria-label={headline ?? 'How it works'}>
                    {steps.map((step) => (
                        <li key={step.num} className="flex flex-col items-center text-center">
                            {step.image?.url ? (
                                <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden bg-accent">
                                    <DynamicImage
                                        src={step.image.url}
                                        alt=""
                                        widths={['80px']}
                                        className="absolute inset-0 w-full h-full"
                                        imageProps={{ className: 'w-full h-full object-contain p-2' }}
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                                    {step.num}
                                </div>
                            )}
                            <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                            {step.desc && <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
