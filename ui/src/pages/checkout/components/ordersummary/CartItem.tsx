import Product from './Product';
import DeliveryDate from './DeliveryDate';
import DeliveryOptions from './DeliveryOptions';
import { useEffect, useState } from 'react';
import { refreshStateViaAPI } from '@/utils';
import type {
	CartItem,
	CartItemExpanded,
	DeliveryOptionExpanded,
} from '@/types';
import { useToast } from '@/hooks/useToast';

export default function CartItem({ cartItem }: { cartItem: CartItemExpanded }) {
	const { setToast } = useToast();
	const [deliveryOptions, setDeliveryOptions] = useState<
		DeliveryOptionExpanded[]
	>([]);

	useEffect(() => {
		refreshStateViaAPI(
			'/api/deliveryOptions?expand=estimatedDeliveryTime',
			setDeliveryOptions,
			{
				setToast,
				when: 'onFailure',
			},
		);
	}, [setToast]);

	return (
		<div className='cart-item-container'>
			<DeliveryDate
				cartItem={cartItem}
				deliveryOptions={deliveryOptions}
			/>
			<div className='cart-item-details-grid'>
				<Product cartItem={cartItem} />
				<DeliveryOptions
					cartItem={cartItem}
					deliveryOptions={deliveryOptions}
				/>
			</div>
		</div>
	);
}
