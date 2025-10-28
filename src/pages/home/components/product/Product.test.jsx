import { describe, expect, it, vi } from 'vitest';
import Product from './Product';
import { render, screen } from '@testing-library/react';
import AppContext from '@/context/AppContext';
import { getPriceNative } from '@/utils';

describe('Product component in HomePage', () => {
	it('displays product details correctly', () => {
		const mockSetCart = vi.fn();
		const mockSetError = vi.fn();

        const name = 'Cotton Oversized Sweater - Gray';
        const image = 'images/products/women-plain-cotton-oversized-sweater-gray.jpg';
        const priceCents = 2400;
        const priceNative = getPriceNative(priceCents);
        const rating = {
				stars: 4.5,
				count: 317,
		}
		const product = {
			keywords: ['sweaters', 'apparel'],
			id: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
			image,
			name,
			rating,
			priceCents,
			createdAt: '2025-10-21T16:14:41.824Z',
			updatedAt: '2025-10-21T16:14:41.824Z',
		};

		render(
			<AppContext.Provider
				value={{ setCart: mockSetCart, setError: mockSetError }}
			>
				<Product product={product} />
			</AppContext.Provider>
		);

        expect(
            // searches for element inside the fake webpage with text passed in params
            screen.getByText(name)
        ).toBeInTheDocument(); // added by jest-dom, checkes whether the element in the document

        expect(
            screen.getByText(priceNative)
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', image);

        expect(
            screen.getByTestId('product-rating-stars')
        ).toHaveAttribute('src', `images/ratings/rating-${rating.stars * 10}.png`);

        expect(
            screen.getByText(rating.count)
        ).toBeInTheDocument();


	});
});
