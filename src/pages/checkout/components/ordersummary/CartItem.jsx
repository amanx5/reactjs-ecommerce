import Product from './Product';
import DeliveryDate from './DeliveryDate';
import DeliveryOptions from './DeliveryOptions';
import CartItemContext from '@/context/CartItemContext';
import { useContext, useEffect, useState } from 'react';
import { refreshStateViaAPI } from '@/utils';
import AppContext from '@/context/AppContext';

export default function CartItem({ cartItem }) {
	const { setError } = useContext(AppContext);
	const [deliveryOptions, setDeliveryOptions] = useState([]);

	useEffect(() => {
		refreshStateViaAPI('delivery-options?expand=estimatedDeliveryTime', setDeliveryOptions, setError);
	}, [setError]);

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
