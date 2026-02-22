import DeliveryOption from './DeliveryOption';
import type { CartItemExpanded, DeliveryOptionExpanded } from '@/types';

export default function DeliveryOptions({
	cartItem,
	deliveryOptions,
}: {
	cartItem: CartItemExpanded;
	deliveryOptions: DeliveryOptionExpanded[];
}) {
	return (
		<div className='delivery-options'>
			<div className='delivery-options-title'>
				Choose a delivery option:
			</div>

			{deliveryOptions.map((deliveryOption) => (
				<DeliveryOption
					key={deliveryOption.id}
					cartItem={cartItem}
					deliveryOption={deliveryOption}
				/>
			))}
		</div>
	);
}
