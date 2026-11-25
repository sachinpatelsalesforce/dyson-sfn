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
import { describe, test, expect } from 'vitest';
import type { ShopperProducts } from '@/scapi';
import KeyFeatureStrip from './key-feature-strip';

const baseProduct: ShopperProducts.schemas['Product'] = { id: 'test-product' };

const withFeatures = (features: string[]): ShopperProducts.schemas['Product'] =>
    ({ ...baseProduct, c_c_filterTechnology: features }) as ShopperProducts.schemas['Product'];

describe('KeyFeatureStrip', () => {
    test('renders null when product has no c_c_filterTechnology', () => {
        const { container } = render(<KeyFeatureStrip product={baseProduct} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders null when features array is empty', () => {
        const { container } = render(<KeyFeatureStrip product={withFeatures([])} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders feature chips for each provided feature', () => {
        const features = ['HEPA filtration', 'Powerful suction', 'Anti-tangle'];
        render(<KeyFeatureStrip product={withFeatures(features)} />);

        expect(screen.getByText('HEPA filtration')).toBeInTheDocument();
        expect(screen.getByText('Powerful suction')).toBeInTheDocument();
        expect(screen.getByText('Anti-tangle')).toBeInTheDocument();
    });

    test('caps display at 4 features even when more are provided', () => {
        const features = ['A', 'B', 'C', 'D', 'E', 'F'];
        render(<KeyFeatureStrip product={withFeatures(features)} />);

        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(4);
    });

    test('renders section with accessible label', () => {
        render(<KeyFeatureStrip product={withFeatures(['Suction'])} />);
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    test('renders icons as aria-hidden', () => {
        render(<KeyFeatureStrip product={withFeatures(['Wind power'])} />);
        const hiddenIcons = document.querySelectorAll('[aria-hidden="true"]');
        expect(hiddenIcons.length).toBeGreaterThan(0);
    });

    test('ignores non-array c_c_filterTechnology values', () => {
        const product = { ...baseProduct, c_c_filterTechnology: 'not-an-array' } as ShopperProducts.schemas['Product'];
        const { container } = render(<KeyFeatureStrip product={product} />);
        expect(container.firstChild).toBeNull();
    });
});
