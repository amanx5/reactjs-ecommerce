import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import PaymentSummary from './PaymentSummary';

import { sampleAPIResponse } from '~/vitest.setup';
import CheckoutContext from '@/context/CheckoutContext';
import { MemoryRouter, useLocation } from 'react-router';
import AppContext from '@/context/AppContext';
import { getPriceNative } from '@/utils';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

const paymentSummaryAPI = '/api/payment-summary';
const paymentSummary = sampleAPIResponse[paymentSummaryAPI];
const {
	productCostCents,
	shippingCostCents,
	totalCostBeforeTaxCents,
	taxCents,
	totalCostCents,
} = paymentSummary;

function Location() {
	const location = useLocation();
	return <div data-testid='url-path'>{location.pathname}</div>;
}

describe('PaymentSummary', () => {
	let productCostCentsEl,
		shippingCostCentsEl,
		totalCostBeforeTaxCentsEl,
		taxCentsEl,
		totalCostCentsEl,
		setCart,
		setError,
		setPaymentSummary,
		user,
		placeOrderBtn,
		locationEl;

	beforeEach(() => {
		user = userEvent.setup();
		setCart = vi.fn();
		setError = vi.fn();
		setPaymentSummary = vi.fn();

		render(
			<AppContext.Provider value={{ setCart, setError }}>
				<MemoryRouter>
					<CheckoutContext.Provider
						value={{ paymentSummary, setPaymentSummary }}
					>
						<Location />
						<PaymentSummary />
					</CheckoutContext.Provider>
				</MemoryRouter>
			</AppContext.Provider>
		);

		productCostCentsEl = screen.getByTestId(
			'payment-summary-productCostCents'
		);
		shippingCostCentsEl = screen.getByTestId(
			'payment-summary-shippingCostCents'
		);
		totalCostBeforeTaxCentsEl = screen.getByTestId(
			'payment-summary-totalCostBeforeTaxCents'
		);
		taxCentsEl = screen.getByTestId('payment-summary-taxCents');
		totalCostCentsEl = screen.getByTestId('payment-summary-totalCostCents');
		placeOrderBtn = screen.getByTestId('place-order-button');
		locationEl = screen.getByTestId('url-path');
	});

	it('should render all the charges correctly', () => {
		expect(productCostCentsEl).toHaveTextContent(
			getPriceNative(productCostCents)
		);
		expect(shippingCostCentsEl).toHaveTextContent(
			getPriceNative(shippingCostCents)
		);
		expect(totalCostBeforeTaxCentsEl).toHaveTextContent(
			getPriceNative(totalCostBeforeTaxCents)
		);
		expect(taxCentsEl).toHaveTextContent(getPriceNative(taxCents));
		expect(totalCostCentsEl).toHaveTextContent(
			getPriceNative(totalCostCents)
		);
	});

	it('places order onclicking Place your order', async () => {
		// in actual app, the url path will be /checkout before clicking place order, but since memory router is used with only one component, it is '/' in this case
		expect(locationEl).toHaveTextContent('/');

		await user.click(placeOrderBtn);

		expect(axios.post).toHaveBeenCalledWith('/api/orders', null);

		expect(axios.get).toHaveBeenCalledWith(
			'/api/cart?expand=product'
		);

		expect(setCart).toHaveBeenCalled();

		expect(locationEl).toHaveTextContent('/orders');
	});
});
