import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from './HomePage';
import { render, screen, within } from '@testing-library/react';
import AppContext from '@/context/AppContext';
import axios from 'axios';
import { MemoryRouter } from 'react-router';

vi.mock('axios');

describe('HomePage component in TrackingPage', () => {
	const setCart = vi.fn();
	const setError = vi.fn();
	const products = [
		{
			keywords: ['socks', 'sports', 'apparel'],
			id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
			name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
			rating: {
				stars: 4.5,
				count: 87,
			},
			priceCents: 1090,
			createdAt: '2025-10-21T16:14:41.818Z',
			updatedAt: '2025-10-21T16:14:41.818Z',
		},
		{
			keywords: ['sports', 'basketballs'],
			id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			image: 'images/products/intermediate-composite-basketball.jpg',
			name: 'Intermediate Size Basketball',
			rating: {
				stars: 4,
				count: 127,
			},
			priceCents: 2095,
			createdAt: '2025-10-21T16:14:41.819Z',
			updatedAt: '2025-10-21T16:14:41.819Z',
		},
	];

	function renderHomePage() {
		render(
			<AppContext.Provider value={{ setCart, setError }}>
				<MemoryRouter>
					{/* homepage has header which has Link comps, which will break without router so memory router is added which is for testing */}
					<HomePage />
				</MemoryRouter>
			</AppContext.Provider>
		);
	}

	beforeEach(() => {
		axios.get.mockImplementation(function (url) {
			if (url === '/api/products') {
				return Promise.resolve({ data: products });
			}
		});
	});

	it('displays all the product details correctly', async () => {
		renderHomePage();

		/**
		 * find:
		 * It looks for all elements with a matching data-testid attribute.
		 * It returns a Promise that resolves when the elements appear in the DOM.
		 * If no elements are found within the timeout (default 1000ms), it throws an error.
		 * it is used instead of get as product-container only renders after useEffect runs, initially products are null so it doesnt render
		 */
		const productContainers = await screen.findAllByTestId(
			'product-container'
		);

		expect(productContainers.length).toBe(products.length);
		expect(
			within(productContainers[0]).getByText(products[0].name)
		).toBeInTheDocument();
		expect(
			within(productContainers[1]).getByText(products[1].name)
		).toBeInTheDocument();
	});
});
