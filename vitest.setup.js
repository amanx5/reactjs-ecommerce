/**
 * Importing the jest-dom module only for its side effects:
 * it adds custom Jest matchers like toBeInTheDocument() globally.
 * eg: expect(element).toBeInTheDocument();
 *
 */
import '@testing-library/jest-dom';
import { vi } from 'vitest';

export const products = [
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

async function axiosGetMock(url) {
	let data = {};
	if (url === '/api/products') {
		data = products;
	}
	return { data };
}

async function axiosPostMock(url, data) {
	return { data };
}

vi.mock('axios', function mockedAxios() {
	return {
		default: {
			get: vi.fn(axiosGetMock),
			post: vi.fn(axiosPostMock),
			put: vi.fn(),
			delete: vi.fn(),
		},
	};
});
