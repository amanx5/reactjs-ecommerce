import Product from './Product';
import DeliveryDate from './DeliveryDate';
import DeliveryOptions from './DeliveryOptions';
import CartItemContext from '@/context/CartItemContext';
import { useEffect, useState } from 'react';
import { setStateFromAPIResponse } from '@/utils';

export default function CartItem({ cartItem }) {
	const [deliveryOptions, setDeliveryOptions] = useState([]);

	useEffect(() => {
		const api = '/api/delivery-options?expand=estimatedDeliveryTime';
		setStateFromAPIResponse(api, setDeliveryOptions);
	}, []);

	return (
		<CartItemContext.Provider
			value={{cartItem, deliveryOptions, setDeliveryOptions}}
		>
			<div className='cart-item-container'>
				<DeliveryDate />
				<div className='cart-item-details-grid'>
					<Product />
					<DeliveryOptions />
				</div>
			</div>
		</CartItemContext.Provider>
	);
}
