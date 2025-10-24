import './CheckoutPage.css';
import CheckoutContext from '@/context/CheckoutContext';
import { useEffect, useState } from 'react';
import CheckoutHeader from './CheckoutHeader';
import PaymentSummary from './components/PaymentSummary';
import { setStateFromAPIResponse } from '@/utils';
import OrderSummary from './components/OrderSummary';

export default function CheckoutPage() {
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		refreshPaymentSummary();
	}, []);

	return (
		<CheckoutContext.Provider
			value={{ paymentSummary, setPaymentSummary, refreshPaymentSummary }}
		>
			<link rel='icon' type='image/png' href='favicon/cart.png' />
			<title>Checkout</title>
			<CheckoutHeader />

			<div className='checkout-page'>
				<div className='page-title'>Review your order</div>

				<div className='checkout-grid'>
					<OrderSummary />
					<PaymentSummary />
				</div>
			</div>
		</CheckoutContext.Provider>
	);

	function refreshPaymentSummary() {
		const api = 'payment-summary';
		setStateFromAPIResponse(api, setPaymentSummary);
	}
}
