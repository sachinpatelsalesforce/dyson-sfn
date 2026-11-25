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

export type ProductVariant = { sku: string; name: string; price: number };

export type CatalogProduct = {
    sku: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    bullets: string[];
    variants: ProductVariant[];
    slug: string;
};

const CATALOG: Record<string, Omit<CatalogProduct, 'sku'>> = {
    '499087-01': {
        name: 'Dyson V16 Piston Animal Submarine™',
        price: 899.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_GB/499087-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            '315 Air Watts suction — most powerful Dyson cordless',
            'Anti-tangle Cones™ Sense head de-tangles hair up to 25 inches',
            'Submarine™ wet roller head washes hard floors',
            '70 min run time',
            'Illuminates invisible dust',
        ],
        variants: [
            { sku: '499087-01', name: 'Dry + Wet', price: 899.99 },
            { sku: '499085-01', name: 'Dry', price: 749.99 },
        ],
        slug: '499087-01',
    },
    '637722-01': {
        name: 'Dyson V15 Detect™ Absolute',
        price: 699.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/637722-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            'Automatically de-tangles hair',
            'Laser-illuminated dust detection',
            'Up to 60 minutes run time',
            'Intelligently calculates run time',
            'For all floor types',
        ],
        variants: [],
        slug: '637722-01',
    },
    '637759-01': {
        name: 'Dyson V12 Detect™ Slim',
        price: 599.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/637759-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            'Most powerful lightweight cordless vacuum',
            'De-tangling technology',
            'Single-button power control',
            'Fluffy Optic™ cleaner head',
            'Up to 60 min run time',
        ],
        variants: [
            { sku: '630917-01', name: 'Dry', price: 549.99 },
            { sku: '637759-01', name: 'Dry + Detail Kit', price: 599.99 },
            { sku: '485296-01', name: 'Dry + Wet', price: 599.99 },
        ],
        slug: '637759-01',
    },
    '499085-01': {
        name: 'Dyson V16 Piston Animal',
        price: 749.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_GB/499085-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            'Most powerful anti-tangle cordless vacuum',
            '315 Air Watts suction',
            '70 min run time',
            '99.99% HEPA filtration',
            'Illuminates invisible dust',
        ],
        variants: [
            { sku: '499085-01', name: 'Dry', price: 749.99 },
            { sku: '499087-01', name: 'Dry + Wet', price: 899.99 },
        ],
        slug: '499085-01',
    },
    '485296-01': {
        name: 'Dyson V12s Detect Slim Submarine',
        price: 599.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/485296-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            'Compact cordless with wet floor washing',
            'Single-button power control',
            'Up to 60 min run time',
            'Submarine™ head washes hard floors',
            'Picks up fine dust and debris',
        ],
        variants: [
            { sku: '630917-01', name: 'Dry', price: 549.99 },
            { sku: '485296-01', name: 'Dry + Wet', price: 599.99 },
        ],
        slug: '485296-01',
    },
    '630917-01': {
        name: 'Dyson V12 Detect™ Slim Absolute',
        price: 549.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary-locale/en_GB/630917-01.png',
        category: 'Cordless Vacuums',
        bullets: [
            'Lightweight with powerful suction',
            'De-tangling technology',
            'Fluffy Optic™ cleaner head reveals fine dust',
            'Single-button power control',
            'Up to 60 min run time',
        ],
        variants: [
            { sku: '630917-01', name: 'Dry', price: 549.99 },
            { sku: '485296-01', name: 'Dry + Wet', price: 599.99 },
        ],
        slug: '630917-01',
    },
    '394520-01': {
        name: 'Dyson Ball Animal Complete',
        price: 429.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/394520-01.png',
        category: 'Upright Vacuums',
        bullets: [
            'Whole-home deep cleaning on carpet',
            'Powerful suction for pet hair',
            'Ball™ technology for easy steering',
            'Self-adjusting cleaner head',
            '10-year guarantee',
        ],
        variants: [],
        slug: '394520-01',
    },
    '626366-01': {
        name: 'Dyson Ball™ Animal Multifloor',
        price: 379.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/626366-01.png',
        category: 'Upright Vacuums',
        bullets: [
            'Powerful suction across all floors',
            'Tackles pet hair and allergens',
            'Self-adjusting cleaner head',
            'Ball™ technology for easy steering',
            'HEPA filtration',
        ],
        variants: [],
        slug: '626366-01',
    },
    '593863-01': {
        name: 'Dyson Ball™ Animal',
        price: 329.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/593863-01.png',
        category: 'Upright Vacuums',
        bullets: [
            'Powerful whole-home suction',
            'Pet grooming tool included',
            'Tangle-free turbine tool',
            'Ball™ technology for tight spaces',
            'HEPA filtration',
        ],
        variants: [],
        slug: '593863-01',
    },
    '664879-01': {
        name: 'Dyson R2 Nurovi™ Wash+Dry robot vacuum',
        price: 749.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/664879-01.png',
        category: 'Robot Vacuums',
        bullets: [
            'Vacuums and mops simultaneously',
            'Reuleaux triangle pads for corners',
            'Twin-capture™ system for dust pickup',
            'Intelligent room mapping',
            'Auto-obstacle avoidance',
        ],
        variants: [],
        slug: '664879-01',
    },
    '664869-01': {
        name: 'Dyson R1 Nurovi™ Dry robot vacuum',
        price: 499.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/664869-01.png',
        category: 'Robot Vacuums',
        bullets: [
            'Powerful dry cleaning on all floors',
            'Twin-capture™ system',
            'Intelligent room mapping',
            'Auto-obstacle avoidance',
            'App control via MyDyson™',
        ],
        variants: [],
        slug: '664869-01',
    },
    '586180-01': {
        name: 'Dyson Spot+Scrub™ Ai',
        price: 1049.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/586180-01.png',
        category: 'Robot Vacuums',
        bullets: [
            'Eliminates hidden stains using Ai',
            'Wet roller self-cleans on every rotation',
            'Hygienic stain removal',
            'Advanced floor mapping',
            'Autonomous spot detection',
        ],
        variants: [],
        slug: '586180-01',
    },
    '122614-01': {
        name: 'Dyson Supersonic Nural™ hair dryer',
        price: 349.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/122614-01.png',
        category: 'Hair Dryers',
        bullets: [
            'Senses hair and scalp separately',
            'IQ Heat™ measures temp 40× per second',
            'Scalp protect mode',
            'No extreme heat damage',
            'Includes 5 styling attachments',
        ],
        variants: [],
        slug: '122614-01',
    },
    '107833-01': {
        name: 'Dyson Supersonic™ Origin hair dryer',
        price: 249.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/107833-01.png',
        category: 'Hair Dryers',
        bullets: [
            'Fast drying, no extreme heat',
            'Intelligent heat control',
            'Protects natural shine',
            '3 speed settings, 4 heat settings',
            'Magnetic attachments',
        ],
        variants: [],
        slug: '107833-01',
    },
    '122783-01': {
        name: 'Dyson Supersonic r™ hair dryer',
        price: 399.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/122783-01.png',
        category: 'Hair Dryers',
        bullets: [
            'Specialist for relaxed, wavy and curly hair',
            'Frizz-free drying with diffuser',
            'IQ Heat™ control',
            'No extreme heat damage',
            'Up to 50% less frizz',
        ],
        variants: [],
        slug: '122783-01',
    },
    '702276-01': {
        name: 'Dyson Supersonic™ Travel hair dryer',
        price: 249.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/702276-01.png',
        category: 'Hair Dryers',
        bullets: [
            'Compact for travel',
            'Dual voltage (100-240V)',
            'No extreme heat damage',
            'Lightweight at 393g',
            'Includes travel bag',
        ],
        variants: [],
        slug: '702276-01',
    },
    '598976-01': {
        name: 'Dyson Supersonic Nural™ – Curly+Coily',
        price: 349.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/598976-01.png',
        category: 'Hair Dryers',
        bullets: [
            'Designed for curly and coily hair',
            'Scalp protect mode',
            'IQ Heat™ control',
            'Includes diffuser attachment',
            'No extreme heat damage',
        ],
        variants: [],
        slug: '598976-01',
    },
    '650108-01': {
        name: 'Dyson Airstrait™ dryer and straightener',
        price: 349.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/650108-01.png',
        category: 'Hair Straighteners',
        bullets: [
            'Straightens as you dry',
            '2× the shine vs. conventional irons',
            'Styling using only airflow — no heat plates',
            'No heat damage',
            'Works on wet or dry hair',
        ],
        variants: [],
        slug: '650108-01',
    },
    '408108-01': {
        name: 'Dyson Corrale™ straightener',
        price: 349.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/408108-01.png',
        category: 'Hair Straighteners',
        bullets: [
            'Flexing manganese copper alloy plates',
            'Cordless with 30 min battery',
            'Reduces extreme heat damage',
            'Intelligent heat control',
            'Automatic sleep mode',
        ],
        variants: [],
        slug: '408108-01',
    },
    '545814-01': {
        name: 'Dyson Purifier Big+Quiet Formaldehyde BP04',
        price: 899.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/545814-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Purifies rooms up to 100m²',
            'Projects 22 gallons of purified air per second',
            'Detects and destroys formaldehyde',
            'Quieter than a whisper at lowest setting',
            'Real-time air quality display',
        ],
        variants: [],
        slug: '545814-01',
    },
    '544837-01': {
        name: 'Dyson Purifier Hot+Cool HP1',
        price: 549.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/544837-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Heats in winter, cools in summer, purifies all year',
            'Captures 99.95% of particles ≥0.1 microns',
            'Automatically senses and reacts to pollutants',
            'HEPA + activated carbon filtration',
            'Compatible with Alexa and Google Home',
        ],
        variants: [],
        slug: '544837-01',
    },
    '544557-01': {
        name: 'Dyson Purifier Hot+Cool HP2 De-NOx',
        price: 699.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/544557-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Removes NO₂ gases as well as particles',
            'Heats, cools and purifies',
            '360° Glass HEPA + activated carbon filter',
            'Air quality LCD display',
            'Smart sensing with auto mode',
        ],
        variants: [],
        slug: '544557-01',
    },
    '544535-01': {
        name: 'Dyson Purifier Cool PC2 De-NOx',
        price: 549.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/544535-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Removes NO₂ in addition to particles',
            'Powerful cooling airflow',
            'Sealed HEPA + activated carbon filtration',
            'Auto mode reacts to air quality',
            'App control via MyDyson™',
        ],
        variants: [],
        slug: '544535-01',
    },
    '544903-01': {
        name: 'Dyson Purifier Cool PC1',
        price: 449.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/544903-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Purifies while cooling',
            'Captures 99.95% of particles ≥0.1 microns',
            'Activated carbon removes odours and gases',
            'Oscillates up to 350°',
            'App control via MyDyson™',
        ],
        variants: [],
        slug: '544903-01',
    },
    '699290-01': {
        name: 'Dyson HushJet™ Purifier Compact',
        price: 399.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/699290-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Whisper-quiet for bedrooms and offices',
            'Compact design for small spaces',
            'HEPA + activated carbon filtration',
            'Sleep mode for overnight use',
            'Real-time air quality monitoring',
        ],
        variants: [],
        slug: '699290-01',
    },
    '430516-01': {
        name: 'Dyson Pure Hot+Cool™ HP00',
        price: 449.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/430516-01.png',
        category: 'Air Purifiers',
        bullets: [
            'Heats, cools and purifies',
            'HEPA filtration captures allergens',
            'Bladeless design for safe airflow',
            'Remote control included',
            'Automatically senses pollutants',
        ],
        variants: [],
        slug: '430516-01',
    },
    '683291-01': {
        name: 'Dyson Zone™ absolute+ headphones (Black/Bright Copper)',
        price: 699.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/683291-01.png',
        category: 'Headphones',
        bullets: [
            'High-fidelity audio by Dyson acoustic engineers',
            'Integrated 3-stage HEPA air purification',
            'Captures 99.95% of particles ≥0.1 microns',
            'Up to 50 hours audio-only battery life',
            'Active noise cancellation + transparency mode',
        ],
        variants: [
            { sku: '683291-01', name: 'Black/Bright Copper', price: 699.99 },
            { sku: '683292-01', name: 'Prussian Blue/Bright Copper', price: 699.99 },
            { sku: '683293-01', name: 'Iron/Bright Copper', price: 449.99 },
        ],
        slug: '683291-01',
    },
    '683292-01': {
        name: 'Dyson Zone™ absolute+ headphones (Prussian Blue/Bright Copper)',
        price: 699.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/683292-01.png',
        category: 'Headphones',
        bullets: [
            'High-fidelity audio by Dyson acoustic engineers',
            'Integrated 3-stage HEPA air purification',
            'Captures 99.95% of particles ≥0.1 microns',
            'Up to 50 hours audio-only battery life',
            'Active noise cancellation + transparency mode',
        ],
        variants: [
            { sku: '683291-01', name: 'Black/Bright Copper', price: 699.99 },
            { sku: '683292-01', name: 'Prussian Blue/Bright Copper', price: 699.99 },
            { sku: '683293-01', name: 'Iron/Bright Copper', price: 449.99 },
        ],
        slug: '683292-01',
    },
    '683293-01': {
        name: 'Dyson Zone™ headphones (Iron/Bright Copper)',
        price: 449.99,
        currency: 'GBP',
        image: 'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/primary/683293-01.png',
        category: 'Headphones',
        bullets: [
            'High-fidelity audio with active noise cancellation',
            'Transparency mode for ambient awareness',
            'Up to 50 hours battery life',
            'MyDyson™ app connectivity',
            'Lightweight at 670g',
        ],
        variants: [
            { sku: '683291-01', name: 'Black/Bright Copper', price: 699.99 },
            { sku: '683292-01', name: 'Prussian Blue/Bright Copper', price: 699.99 },
            { sku: '683293-01', name: 'Iron/Bright Copper', price: 449.99 },
        ],
        slug: '683293-01',
    },
};

export function getProducts(skus: string[]): CatalogProduct[] {
    return skus.flatMap((sku) => {
        const p = CATALOG[sku];
        return p ? [{ sku, ...p }] : [];
    });
}

export function getProduct(sku: string): CatalogProduct | undefined {
    const p = CATALOG[sku];
    return p ? { sku, ...p } : undefined;
}
