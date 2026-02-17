import { useContext } from 'react';
import {
	formatDate,
	getPriceNative,
	refreshStateViaAPI,
	updateDeliveryOption,
} from '@/utils';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';
import CartItemContext from '@/context/CartItemContext';

export default function DeliveryOption({ deliveryOption }) {
	const { setCart, setError } = useContext(AppContext);
	const { setPaymentSummary } = useContext(CheckoutContext);
	const { cartItem } = useContext(CartItemContext);

	const { productId, deliveryOptionId } = cartItem;
	const { id, deliveryDays, priceCents, estimatedDeliveryTimeMs } =
		deliveryOption;

	return (
		<label className='delivery-option'>
			<input
				type='radio'
				className='delivery-option-input'
				name={`delivery-option-${productId}`}
				checked={id === deliveryOptionId}
				onChange={deliveryOptionOnChange}
			/>
			<div>
				<div className='delivery-option-date'>
					{formatDate(new Date(estimatedDeliveryTimeMs))}
				</div>
				<div className='delivery-option-price'>
					{priceCents ? getPriceNative(priceCents) : 'FREE Shipping'}
				</div>
			</div>
		</label>
	);

	async function deliveryOptionOnChange(event) {
		const isUpdated = await updateDeliveryOption(id, productId);
		if (isUpdated) {
			refreshStateViaAPI('cart?expand=product', setCart, setError);
			refreshStateViaAPI('payment-summary', setPaymentSummary, setError);
		}
	}
}
