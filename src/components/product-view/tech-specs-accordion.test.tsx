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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import type { ShopperProducts } from '@/scapi';
import TechSpecsAccordion from './tech-specs-accordion';

const baseProduct: ShopperProducts.schemas['Product'] = { id: 'test-product' };

const withAttrs = (attrs: Record<string, unknown>): ShopperProducts.schemas['Product'] =>
    ({ ...baseProduct, ...attrs }) as ShopperProducts.schemas['Product'];

describe('TechSpecsAccordion', () => {
    test('renders null when no spec data is available', () => {
        const { container } = render(<TechSpecsAccordion product={baseProduct} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders overview accordion item when longDescription differs from shortDescription', () => {
        const product = withAttrs({
            shortDescription: 'Short',
            longDescription: 'A detailed long description.',
        });
        render(<TechSpecsAccordion product={product} />);
        expect(screen.getByRole('button', { name: /overview/i })).toBeInTheDocument();
    });

    test('does not render overview when longDescription equals shortDescription', () => {
        const product = withAttrs({ shortDescription: 'Same', longDescription: 'Same' });
        const { container } = render(<TechSpecsAccordion product={product} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders c_specDimensions accordion item', () => {
        render(<TechSpecsAccordion product={withAttrs({ c_specDimensions: '25 × 12 × 10 cm' })} />);
        expect(screen.getByRole('button', { name: /dimensions/i })).toBeInTheDocument();
    });

    test('renders c_specInBox accordion item', () => {
        render(<TechSpecsAccordion product={withAttrs({ c_specInBox: 'Vacuum, charger, dock' })} />);
        expect(screen.getByRole('button', { name: /in the box/i })).toBeInTheDocument();
    });

    test('renders c_boxContents accordion item', () => {
        render(<TechSpecsAccordion product={withAttrs({ c_boxContents: 'Tool A|Tool B' })} />);
        expect(screen.getByRole('button', { name: /box contents/i })).toBeInTheDocument();
    });

    test('expands accordion item on click and shows content', async () => {
        const user = userEvent.setup();
        render(<TechSpecsAccordion product={withAttrs({ c_specDimensions: '25 × 12 × 10 cm' })} />);

        await user.click(screen.getByRole('button', { name: /dimensions/i }));
        expect(screen.getByText('25 × 12 × 10 cm')).toBeVisible();
    });

    test('renders multiple sections when multiple attributes are present', () => {
        const product = withAttrs({
            c_specDimensions: '25cm',
            c_specPower: '25W',
            c_specWarranty: '2 years',
        });
        render(<TechSpecsAccordion product={product} />);
        expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(3);
    });

    test('skips non-string spec attribute values', () => {
        const product = withAttrs({ c_specDimensions: 42 });
        const { container } = render(<TechSpecsAccordion product={product} />);
        expect(container.firstChild).toBeNull();
    });
});
