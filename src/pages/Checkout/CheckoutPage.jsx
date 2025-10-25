import './CheckoutPage.css';
import { useContext, useEffect, useState } from 'react';
import { getCheckoutHeading, setStateFromAPIResponse } from '@/utils';
import CheckoutHeader from './CheckoutHeader';
import PaymentSummary from './components/PaymentSummary';
import OrderSummary from './components/OrderSummary';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';

export default function CheckoutPage() {
	const { cart } = useContext(AppContext);
	const pageTitle = getCheckoutHeading(cart);
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
				<div className='page-title'>{pageTitle}</div>

				{cart?.length ? (
					<div className='checkout-grid'>
						<OrderSummary />
						<PaymentSummary />
					</div>
				) : (
					<div>
						{cart === null ? '' : 'Add some items in the cart.'}
					</div>
				)}
			</div>
		</CheckoutContext.Provider>
	);

	function refreshPaymentSummary() {
		const api = 'payment-summary';
		setStateFromAPIResponse(api, setPaymentSummary);
	}
}
