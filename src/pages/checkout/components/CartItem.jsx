import { useEffect, useState } from 'react';
import { CartProduct } from '@/components/Product';
import DeliveryOptions from './DeliveryOptions';
import { formatDate } from '@/utils';
import { setStateFromAPIResponse } from '@/utils';

export default function CartItem({ cartItem }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	useEffect(() => {
		const api = '/api/delivery-options?expand=estimatedDeliveryTime';
		setStateFromAPIResponse(api, setDeliveryOptions);
	}, []);

	const selectedDeliveryOption = deliveryOptions.find(
		({ id }) => id === cartItem?.deliveryOptionId
	);

	const { estimatedDeliveryTimeMs } = selectedDeliveryOption || {};

	return (
		<div className='cart-item-container'>
			<div className='delivery-date'>
				Delivery date: {formatDate(new Date(estimatedDeliveryTimeMs))}
			</div>

			<div className='cart-item-details-grid'>
				<CartProduct cartProduct={cartItem} />
				<DeliveryOptions
					cartItem={cartItem}
					deliveryOptions={deliveryOptions}
				/>
			</div>
		</div>
	);
}
