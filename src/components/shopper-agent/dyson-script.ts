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

export type ConversationNode = {
    id: string;
    messages: string[];
    chips?: { label: string; nextId: string }[];
    productSkus?: string[];
};

export const SCRIPT: Record<string, ConversationNode> = {
    welcome: {
        id: 'welcome',
        messages: [
            "Hi! Welcome to Dyson. Happy to help you find what you need — where would you like to start?",
        ],
        chips: [
            { label: 'What vacuum is right for me?', nextId: 'vacuum-floors' },
            { label: 'Shop cordless vacuums', nextId: 'recommend-cordless' },
            { label: 'Shop hair care', nextId: 'hair-welcome' },
            { label: 'Shop air purifiers', nextId: 'air-welcome' },
            { label: 'Dyson Zone™ headphones', nextId: 'recommend-headphones' },
        ],
    },

    // ── Vacuum quiz ───────────────────────────────────────────────────────────

    'vacuum-floors': {
        id: 'vacuum-floors',
        messages: ["Let's find the right vacuum for you. What type of floors do you mostly have?"],
        chips: [
            { label: 'Mostly hardwood', nextId: 'vacuum-pets-hardwood' },
            { label: 'Mostly carpet', nextId: 'vacuum-pets-carpet' },
            { label: 'Mix of both', nextId: 'vacuum-pets-mixed' },
        ],
    },

    'vacuum-pets-hardwood': {
        id: 'vacuum-pets-hardwood',
        messages: ["Hardwood floors benefit from gentle but thorough suction. Do you have pets at home?"],
        chips: [
            { label: 'Yes, I have pets', nextId: 'recommend-pets-cordless' },
            { label: 'No pets', nextId: 'recommend-cordless' },
        ],
    },

    'vacuum-pets-carpet': {
        id: 'vacuum-pets-carpet',
        messages: ["Carpet needs powerful suction and deep-pile performance. Do you have pets at home?"],
        chips: [
            { label: 'Yes, I have pets', nextId: 'recommend-pets-cordless' },
            { label: 'No pets', nextId: 'recommend-upright' },
        ],
    },

    'vacuum-pets-mixed': {
        id: 'vacuum-pets-mixed',
        messages: ["A mixed-floor home needs versatility. Do you have pets at home?"],
        chips: [
            { label: 'Yes, I have pets', nextId: 'recommend-pets-cordless' },
            { label: 'No pets', nextId: 'recommend-cordless' },
        ],
    },

    'recommend-cordless': {
        id: 'recommend-cordless',
        messages: [
            "Our cordless vacuums offer powerful suction with up to 60 minutes of run time. Here are our top picks:",
        ],
        productSkus: ['637722-01', '637759-01', '499085-01', '630917-01'],
        chips: [
            { label: 'I have pets', nextId: 'recommend-pets-cordless' },
            { label: 'Show me robot vacuums', nextId: 'recommend-robot' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-pets-cordless': {
        id: 'recommend-pets-cordless',
        messages: [
            "For pet owners, you'll want specialist anti-tangle technology and powerful suction to capture every hair. Here are our best pet vacuums:",
        ],
        productSkus: ['499087-01', '499085-01', '637722-01', '485296-01'],
        chips: [
            { label: 'Show me robot vacuums', nextId: 'recommend-robot' },
            { label: 'What about hair care?', nextId: 'hair-welcome' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-upright': {
        id: 'recommend-upright',
        messages: [
            "Our upright vacuums deliver whole-home deep cleaning on carpet. Here are our top performers:",
        ],
        productSkus: ['394520-01', '626366-01', '593863-01'],
        chips: [
            { label: 'Show me cordless instead', nextId: 'recommend-cordless' },
            { label: 'Show me robot vacuums', nextId: 'recommend-robot' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-robot': {
        id: 'recommend-robot',
        messages: [
            "Let Dyson clean while you're out. Our robot vacuums use intelligent mapping to navigate every room:",
        ],
        productSkus: ['664869-01', '664879-01', '586180-01'],
        chips: [
            { label: 'Tell me more about the R2', nextId: 'detail-r2' },
            { label: 'Show me cordless vacuums', nextId: 'recommend-cordless' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'detail-r2': {
        id: 'detail-r2',
        messages: [
            "The Dyson R2 Nurovi™ Wash+Dry robot vacuum is Dyson's most advanced floor care robot.",
            "It vacuums and mops simultaneously, with auto-emptying dock, intelligent room mapping, and the ability to detect and avoid obstacles in real time.",
        ],
        productSkus: ['664879-01'],
        chips: [
            { label: 'Show me all robot vacuums', nextId: 'recommend-robot' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    // ── Hair care ─────────────────────────────────────────────────────────────

    'hair-welcome': {
        id: 'hair-welcome',
        messages: [
            "Our hair care range is engineered to protect hair from heat damage while delivering salon-quality results. What are you looking for?",
        ],
        chips: [
            { label: 'Hair dryers', nextId: 'recommend-dryers' },
            { label: 'Straighteners & stylers', nextId: 'recommend-straighteners' },
            { label: 'Curl stylers', nextId: 'recommend-curlers' },
        ],
    },

    'recommend-dryers': {
        id: 'recommend-dryers',
        messages: [
            "The Dyson Supersonic™ range uses intelligent heat control to prevent extreme heat damage. Here are our hair dryers:",
        ],
        productSkus: ['122614-01', '107833-01', '122783-01', '702276-01'],
        chips: [
            { label: 'Tell me about the Supersonic Nural', nextId: 'detail-nural' },
            { label: 'See straighteners instead', nextId: 'recommend-straighteners' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'detail-nural': {
        id: 'detail-nural',
        messages: [
            "The Dyson Supersonic Nural™ is our most intelligent hair dryer.",
            "It senses hair and scalp separately — drying hair fast while protecting your scalp. With 6 attachments and IQ Heat™ technology that measures temperature 40 times per second.",
        ],
        productSkus: ['122614-01', '598976-01'],
        chips: [
            { label: 'See all hair dryers', nextId: 'recommend-dryers' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-straighteners': {
        id: 'recommend-straighteners',
        messages: [
            "Our straighteners and dryer-straighteners combine styling with hair protection:",
        ],
        productSkus: ['650108-01', '408108-01'],
        chips: [
            { label: 'See hair dryers', nextId: 'recommend-dryers' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-curlers': {
        id: 'recommend-curlers',
        messages: [
            "Our curl stylers use controlled airflow to form curls without extreme heat:",
        ],
        productSkus: ['650108-01', '408108-01'],
        chips: [
            { label: 'See hair dryers', nextId: 'recommend-dryers' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    // ── Air purifiers ─────────────────────────────────────────────────────────

    'air-welcome': {
        id: 'air-welcome',
        messages: [
            "Our purifiers capture 99.95% of particles as small as 0.1 microns, including allergens, bacteria, and pollutants.",
            "What matters most to you?",
        ],
        chips: [
            { label: 'Heating & cooling too', nextId: 'recommend-air-hot-cool' },
            { label: 'Purifying & cooling only', nextId: 'recommend-air-cool' },
            { label: 'Large room coverage', nextId: 'recommend-air-big' },
            { label: 'Compact for small spaces', nextId: 'recommend-air-compact' },
        ],
    },

    'recommend-air-hot-cool': {
        id: 'recommend-air-hot-cool',
        messages: [
            "These purifiers heat in winter, cool in summer, and purify year-round:",
        ],
        productSkus: ['544837-01', '544557-01', '430516-01'],
        chips: [
            { label: 'See all purifiers', nextId: 'air-welcome' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-air-cool': {
        id: 'recommend-air-cool',
        messages: [
            "These purifiers deliver whole-room purification with powerful cooling airflow:",
        ],
        productSkus: ['544903-01', '544535-01'],
        chips: [
            { label: 'See heating options too', nextId: 'recommend-air-hot-cool' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-air-big': {
        id: 'recommend-air-big',
        messages: [
            "For large rooms, the Dyson Purifier Big + Quiet projects purified air across the whole space — quietly:",
        ],
        productSkus: ['545814-01'],
        chips: [
            { label: 'See all purifiers', nextId: 'air-welcome' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'recommend-air-compact': {
        id: 'recommend-air-compact',
        messages: [
            "Our compact purifiers are perfect for bedrooms, offices, or smaller spaces:",
        ],
        productSkus: ['699290-01', '544903-01'],
        chips: [
            { label: 'See larger options', nextId: 'recommend-air-big' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    // ── Headphones ────────────────────────────────────────────────────────────

    'recommend-headphones': {
        id: 'recommend-headphones',
        messages: [
            "The Dyson Zone™ is the world's first headphone to combine high-fidelity audio with personal air purification.",
            "Engineered by Dyson acoustic engineers, with active noise cancellation and up to 50 hours battery life:",
        ],
        productSkus: ['683291-01', '683292-01', '683293-01'],
        chips: [
            { label: 'Tell me about the Zone absolute+', nextId: 'detail-zone' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },

    'detail-zone': {
        id: 'detail-zone',
        messages: [
            "The Dyson Zone™ absolute+ is our most advanced headphone.",
            "Key features:\n• Fully sealed 3-stage HEPA filtration\n• Captures 99.95% of particles as small as 0.1 microns\n• Detects and destroys formaldehyde\n• High-fidelity sound with active noise cancellation\n• Up to 50 hours audio-only battery life\n• MyDyson™ app connectivity",
        ],
        productSkus: ['683291-01', '683292-01'],
        chips: [
            { label: 'See all headphones', nextId: 'recommend-headphones' },
            { label: 'Start over', nextId: 'welcome' },
        ],
    },
};

export const WELCOME_NODE_ID = 'welcome';

const KEYWORD_RULES: Array<{ keywords: string[]; nodeId: string }> = [
    { keywords: ['pet', 'pets', 'dog', 'cat', 'fur', 'animal hair'], nodeId: 'recommend-pets-cordless' },
    { keywords: ['robot', 'robotic', 'automatic', 'self-clean', 'roomba'], nodeId: 'recommend-robot' },
    { keywords: ['upright', 'ball animal'], nodeId: 'recommend-upright' },
    { keywords: ['cordless', 'wireless', 'handheld', 'stick'], nodeId: 'recommend-cordless' },
    { keywords: ['vacuum', 'hoover', 'clean floor', 'floor'], nodeId: 'vacuum-floors' },
    { keywords: ['supersonic', 'blow dry', 'blow-dry', 'hair dryer', 'hairdryer'], nodeId: 'recommend-dryers' },
    { keywords: ['straighten', 'flat iron', 'corrale', 'airstrait'], nodeId: 'recommend-straighteners' },
    { keywords: ['curl', 'wave', 'curler', 'airwrap'], nodeId: 'recommend-curlers' },
    { keywords: ['hair'], nodeId: 'hair-welcome' },
    { keywords: ['purifier', 'air quality', 'allergen', 'pollution', 'formaldehyde', 'hepa'], nodeId: 'air-welcome' },
    { keywords: ['heater', 'heating', 'warm', 'hot cool'], nodeId: 'recommend-air-hot-cool' },
    { keywords: ['headphone', 'zone', 'audio', 'music', 'noise cancel', 'earphone'], nodeId: 'recommend-headphones' },
];

export function matchKeywords(input: string): string | null {
    const lower = input.toLowerCase();
    for (const { keywords, nodeId } of KEYWORD_RULES) {
        if (keywords.some((kw) => lower.includes(kw))) return nodeId;
    }
    return null;
}
