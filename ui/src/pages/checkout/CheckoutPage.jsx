import './CheckoutPage.css';
import { useContext, useEffect, useState } from 'react';
import { getCheckoutHeading, refreshStateViaAPI } from '@/utils';
import CheckoutHeader from './CheckoutHeader';
import PaymentSummary from './components/PaymentSummary';
import OrderSummary from './components/OrderSummary';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';
import Loader from '@/components/Loader';

export default function CheckoutPage() {
	const { cart, setError } = useContext(AppContext);
	const pageTitle = getCheckoutHeading(cart);
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		refreshStateViaAPI('/api/paymentSummary', setPaymentSummary, setError);
	}, [setError]);

	return (
		<CheckoutContext.Provider value={{ paymentSummary, setPaymentSummary }}>
			<link rel='icon' type='image/png' href='favicon/cart.png' />
			<title>Checkout</title>
			<CheckoutHeader />

			{cart === null ? (
				<Loader />
			) : (
				<div className='checkout-page'>
					<div className='page-title'>{pageTitle}</div>

					{cart.length === 0 ? (
						<div>Add some items in the cart.</div>
					) : (
						<div className='checkout-grid'>
							<OrderSummary />
							<PaymentSummary />
						</div>
					)}
				</div>
			)}
		</CheckoutContext.Provider>
	);
}
