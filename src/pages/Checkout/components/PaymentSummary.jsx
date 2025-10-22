import { useEffect, useState } from 'react';
import { getTotalCartItems, setStateFromAPIResponse } from '@/utils';
import { getPriceNative } from '@/utils';


export default function PaymentSummary({ cart }) {
	const totalCartItems = getTotalCartItems(cart);
	const [paymentSummary, setPaymentSummary] = useState(null);

	useEffect(() => {
		const api = '/api/payment-summary';
		setStateFromAPIResponse(api, setPaymentSummary);
	}, []);

	const {
		totalItems,
		productCostCents,
		shippingCostCents,
		totalCostBeforeTaxCents,
		taxCents,
		totalCostCents,
	} = paymentSummary || {};

	return paymentSummary ? (
		<div className='payment-summary'>
			<div className='payment-summary-title'>Payment Summary</div>

			<div className='payment-summary-row'>
				<div>
					Items ({totalCartItems || totalItems}):
				</div>
				<div className='payment-summary-money'>{getPriceNative(productCostCents)}</div>
			</div>

			<div className='payment-summary-row'>
				<div>Shipping &amp; handling:</div>
				<div className='payment-summary-money'>{getPriceNative(shippingCostCents)}</div>
			</div>

			<div className='payment-summary-row subtotal-row'>
				<div>Total before tax:</div>
				<div className='payment-summary-money'>{getPriceNative(totalCostBeforeTaxCents)}</div>
			</div>

			<div className='payment-summary-row'>
				<div>Estimated tax (10%):</div>
				<div className='payment-summary-money'>{getPriceNative(taxCents)}</div>
			</div>

			<div className='payment-summary-row total-row'>
				<div>Order total:</div>
				<div className='payment-summary-money'>{getPriceNative(totalCostCents)}</div>
			</div>

			<button className='place-order-button button-primary'>
				Place your order
			</button>
		</div>
	) : (
		'Loading...'
	);
}
