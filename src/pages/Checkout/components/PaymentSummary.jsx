import { useContext } from 'react';
import { getPriceNative } from '@/utils';
import CheckoutContext from '@/context/CheckoutContext';

export default function PaymentSummary() {
	const { paymentSummary } = useContext(CheckoutContext);

	const {
		totalItems,
		productCostCents,
		shippingCostCents,
		totalCostBeforeTaxCents,
		taxCents,
		totalCostCents,
	} = paymentSummary || {};

	return (
		<div className='payment-summary'>
			<div className='payment-summary-title'>Payment Summary</div>

			<div className='payment-summary-row'>
				<div>Items ({totalItems}):</div>
				<div className='payment-summary-money'>
					{getPriceNative(productCostCents)}
				</div>
			</div>

			<div className='payment-summary-row'>
				<div>Shipping &amp; handling:</div>
				<div className='payment-summary-money'>
					{getPriceNative(shippingCostCents)}
				</div>
			</div>

			<div className='payment-summary-row subtotal-row'>
				<div>Total before tax:</div>
				<div className='payment-summary-money'>
					{getPriceNative(totalCostBeforeTaxCents)}
				</div>
			</div>

			<div className='payment-summary-row'>
				<div>Estimated tax (10%):</div>
				<div className='payment-summary-money'>
					{getPriceNative(taxCents)}
				</div>
			</div>

			<div className='payment-summary-row total-row'>
				<div>Order total:</div>
				<div className='payment-summary-money'>
					{getPriceNative(totalCostCents)}
				</div>
			</div>

			<button className='place-order-button button-primary'>
				Place your order
			</button>
		</div>
	);
}
