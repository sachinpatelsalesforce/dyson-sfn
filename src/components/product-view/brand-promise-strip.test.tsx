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
import { getTranslation } from '@salesforce/storefront-next-runtime/i18n';
import BrandPromiseStrip from './brand-promise-strip';

const { t } = getTranslation();

describe('BrandPromiseStrip', () => {
    test('renders the warranty promise', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.warranty'))).toBeInTheDocument();
    });

    test('renders the delivery promise', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.delivery'))).toBeInTheDocument();
    });

    test('renders the returns promise', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.returns'))).toBeInTheDocument();
    });

    test('renders warranty description', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.warrantyDesc'))).toBeInTheDocument();
    });

    test('renders delivery description', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.deliveryDesc'))).toBeInTheDocument();
    });

    test('renders returns description', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByText(t('product:dyson.promise.returnsDesc'))).toBeInTheDocument();
    });

    test('renders 3 promise tiles', () => {
        const { container } = render(<BrandPromiseStrip />);
        const divs = container.querySelectorAll('section > div');
        expect(divs).toHaveLength(3);
    });

    test('renders icons as aria-hidden', () => {
        render(<BrandPromiseStrip />);
        const hiddenIcons = document.querySelectorAll('[aria-hidden="true"]');
        expect(hiddenIcons.length).toBeGreaterThanOrEqual(3);
    });

    test('applies custom className when provided', () => {
        const { container } = render(<BrandPromiseStrip className="custom-class" />);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    test('renders section with Dyson Promise label', () => {
        render(<BrandPromiseStrip />);
        expect(screen.getByRole('region', { name: 'Dyson Promise' })).toBeInTheDocument();
    });
});
