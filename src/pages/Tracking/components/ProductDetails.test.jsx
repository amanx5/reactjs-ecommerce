import { describe, expect, it } from 'vitest';
import ProductDetails from './ProductDetails';
import { render, screen } from '@testing-library/react';

describe('ProductDetails component in TrackingPage', () => {
	it('displays product details correctly', () => {
		const orderProduct = {
			product: {
				keywords: ['sweaters', 'apparel'],
				id: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
				image: 'images/products/women-plain-cotton-oversized-sweater-gray.jpg',
				name: 'Cotton Oversized Sweater - Gray',
				rating: {
					stars: 4.5,
					count: 317,
				},
				priceCents: 2400,
				createdAt: '2025-10-21T16:14:41.824Z',
				updatedAt: '2025-10-21T16:14:41.824Z',
			},
		};

		// renders the component in fake web page
		render(<ProductDetails orderProduct={orderProduct} />);

		expect(
			// searches for element inside the fake webpage with text passed in params
			screen.getByText('Cotton Oversized Sweater - Gray')
		).toBeInTheDocument(); // added by jest-dom, checkes whether the element in the document
	});
});
