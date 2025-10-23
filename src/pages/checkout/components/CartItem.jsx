import { useEffect, useState } from 'react';
import Product from './Product';
import DeliveryOptions from './DeliveryOptions';
import { formatDate, setStateFromAPIResponse } from '@/utils';

export default function CartItem({ cartItem }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);
	useEffect(() => {
		const api = '/api/delivery-options?expand=estimatedDeliveryTime';
		setStateFromAPIResponse(api, setDeliveryOptions);
	}, []);

	return (
		<div className='cart-item-container'>
			<DeliveryDate
				cartItem={cartItem}
				deliveryOptions={deliveryOptions}
			/>
			<div className='cart-item-details-grid'>
				<Product cartProduct={cartItem} />
				<DeliveryOptions
					cartItem={cartItem}
					deliveryOptions={deliveryOptions}
				/>
			</div>
		</div>
	);
}

function DeliveryDate({ cartItem, deliveryOptions }) {
	const selectedDeliveryOption = deliveryOptions.find(
		(deliveryOption) => deliveryOption?.id === cartItem?.deliveryOptionId
	);
	const { estimatedDeliveryTimeMs } = selectedDeliveryOption || {};
	
	return (
		<div className='delivery-date'>
			Delivery date: {formatDate(estimatedDeliveryTimeMs)}
		</div>
	);
}
