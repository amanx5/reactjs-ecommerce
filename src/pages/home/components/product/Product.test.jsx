import { describe, expect, it, vi } from 'vitest';
import Product from './Product';
import { render, screen } from '@testing-library/react';
import AppContext from '@/context/AppContext';
import { getPriceNative } from '@/utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// no-op version of axios (which doesn't connect to backend) will be invoked whereever axios is called
vi.mock('axios');

const id = 'dd82ca78-a18b-4e2a-9250-31e67412f98d';
const name = 'Cotton Oversized Sweater - Gray';
const image = 'images/products/women-plain-cotton-oversized-sweater-gray.jpg';
const priceCents = 2400;
const priceNative = getPriceNative(priceCents);
const rating = {
	stars: 4.5,
	count: 317,
};

const setCart = vi.fn();
const setError = vi.fn();

function renderProductComponent() {
	const product = {
		keywords: ['sweaters', 'apparel'],
		id,
		image,
		name,
		rating,
		priceCents,
		createdAt: '2025-10-21T16:14:41.824Z',
		updatedAt: '2025-10-21T16:14:41.824Z',
	};

	render(
		<AppContext.Provider value={{ setCart, setError }}>
			<Product product={product} />
		</AppContext.Provider>
	);
}

describe('Product component in HomePage', () => {
	it('displays product details correctly', () => {
		renderProductComponent();

		expect(
			// searches for element inside the fake webpage with text passed in params
			screen.getByText(name)
		).toBeInTheDocument(); // added by jest-dom, checkes whether the element in the document

		expect(screen.getByText(priceNative)).toBeInTheDocument();

		expect(screen.getByTestId('product-image')).toHaveAttribute(
			'src',
			image
		);

		expect(screen.getByTestId('product-rating-stars')).toHaveAttribute(
			'src',
			`images/ratings/rating-${rating.stars * 10}.png`
		);

		expect(screen.getByText(rating.count)).toBeInTheDocument();
	});

	// test user interaction
	it('adds product to cart on clicking AddToCart', async () => {
		renderProductComponent();
		const user = userEvent.setup();
		await user.click(screen.getByTestId('AddToCart'));

		expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
			productId: id,
			quantity: 1,
		});

		expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
			productId: id,
			quantity: 1,
		});

		// expect(setCart).toHaveBeenCalled();
	});
});
