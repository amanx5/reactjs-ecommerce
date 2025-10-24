import DeliveryOption from './DeliveryOption';
import { useContext } from 'react';
import CartItemContext from '@/context/CartItemContext';

export default function DeliveryOptions() {
	const { deliveryOptions } = useContext(CartItemContext);

	return (
		<div className='delivery-options'>
			<div className='delivery-options-title'>
				Choose a delivery option:
			</div>

			{deliveryOptions.map((deliveryOption) => (
				<DeliveryOption key={deliveryOption.id} deliveryOption={deliveryOption}/>
			))}
		</div>
	);
}
