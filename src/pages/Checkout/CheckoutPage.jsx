import './CheckoutPage.css';
import { useContext, useEffect, useState } from 'react';
import { checkIsCartEmpty, setStateFromAPIResponse } from '@/utils';
import CheckoutHeader from './CheckoutHeader';
import PaymentSummary from './components/PaymentSummary';
import OrderSummary from './components/OrderSummary';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';

export default function CheckoutPage() {
	const { cart } = useContext(AppContext);
	const isCartEmpty = checkIsCartEmpty(cart);
	const pageTitle = isCartEmpty ? 'No items in cart' : 'Review your order';

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

				{isCartEmpty ? (
					<div> Add some items in the cart. </div>
				) : (
					<div className='checkout-grid'>
						<OrderSummary />
						<PaymentSummary />
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
