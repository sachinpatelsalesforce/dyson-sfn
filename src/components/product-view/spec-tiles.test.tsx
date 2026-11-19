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
import SpecTiles from './spec-tiles';

const baseProduct: ShopperProducts.schemas['Product'] = { id: 'test-product' };

const withSpecs = (attrs: Record<string, unknown>): ShopperProducts.schemas['Product'] =>
    ({ ...baseProduct, ...attrs } as ShopperProducts.schemas['Product']);

describe('SpecTiles', () => {
    test('renders null when no numeric spec attributes are present', () => {
        const { container } = render(<SpecTiles product={baseProduct} />);
        expect(container.firstChild).toBeNull();
    });

    test('renders suction tile when c_suctionAW is present', () => {
        render(<SpecTiles product={withSpecs({ c_suctionAW: 120 })} />);
        expect(screen.getByText('120')).toBeInTheDocument();
    });

    test('renders runtime tile when c_runTimeMin is present', () => {
        render(<SpecTiles product={withSpecs({ c_runTimeMin: 60 })} />);
        expect(screen.getByText('60')).toBeInTheDocument();
    });

    test('renders bin volume tile when c_binVolumeL is present', () => {
        render(<SpecTiles product={withSpecs({ c_binVolumeL: 0.35 })} />);
        expect(screen.getByText('0.35')).toBeInTheDocument();
    });

    test('renders weight tile when c_weightKg is present', () => {
        render(<SpecTiles product={withSpecs({ c_weightKg: 2.1 })} />);
        expect(screen.getByText('2.1')).toBeInTheDocument();
    });

    test('renders filtration tile when c_filtrationPct is present', () => {
        render(<SpecTiles product={withSpecs({ c_filtrationPct: 99.99 })} />);
        expect(screen.getByText('99.99')).toBeInTheDocument();
    });

    test('renders only tiles that have numeric values', () => {
        render(<SpecTiles product={withSpecs({ c_suctionAW: 120, c_weightKg: 2.1 })} />);
        const tiles = screen.getAllByRole('listitem');
        expect(tiles).toHaveLength(2);
    });

    test('renders LevelMeter when suctionLevel is provided', () => {
        render(<SpecTiles product={withSpecs({ c_suctionAW: 120, c_suctionLevel: 3 })} />);
        const meter = screen.getByRole('meter');
        expect(meter).toHaveAttribute('aria-valuenow', '3');
        expect(meter).toHaveAttribute('aria-valuemin', '1');
        expect(meter).toHaveAttribute('aria-valuemax', '3');
    });

    test('clamps LevelMeter value to 1–3 range', () => {
        render(<SpecTiles product={withSpecs({ c_suctionAW: 120, c_suctionLevel: 99 })} />);
        const meter = screen.getByRole('meter');
        expect(meter).toHaveAttribute('aria-valuenow', '3');
    });

    test('does not render LevelMeter when level attribute is absent', () => {
        render(<SpecTiles product={withSpecs({ c_suctionAW: 120 })} />);
        expect(screen.queryByRole('meter')).not.toBeInTheDocument();
    });

    test('skips non-numeric spec values', () => {
        const { container } = render(<SpecTiles product={withSpecs({ c_suctionAW: 'invalid' })} />);
        expect(container.firstChild).toBeNull();
    });
});
