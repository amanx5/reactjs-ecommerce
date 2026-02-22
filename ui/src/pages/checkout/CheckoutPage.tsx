import { CheckoutContext } from '@/context/CheckoutContext';
import Loader from '@/components/Loader';
import { PaymentSummaryData } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import './CheckoutPage.css';
import PaymentSummary from './components/PaymentSummary';
import OrderSummary from './components/OrderSummary';
import CheckoutHeader from './CheckoutHeader';
import { getCheckoutHeading, refreshStateViaAPI } from '@/utils';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
	const { cart } = useCart();
	const { setToast } = useToast();
	const pageTitle = getCheckoutHeading(cart);
	const [paymentSummary, setPaymentSummary] =
		useState<PaymentSummaryData | null>(null);

	useEffect(() => {
		refreshStateViaAPI<PaymentSummaryData | null>(
			'/api/paymentSummary',
			setPaymentSummary,
			{
				setToast,
				when: 'onFailure',
			},
		);
	}, [setToast]);

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
