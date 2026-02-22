import { formatDate } from '@/utils';
import type { CartItem, DeliveryOptionExpanded } from '@/types';

export default function DeliveryDate({
	cartItem,
	deliveryOptions,
}: {
	cartItem: CartItem;
	deliveryOptions: DeliveryOptionExpanded[];
}) {
	const selectedDeliveryOption = deliveryOptions.find(
		(deliveryOption) => deliveryOption?.id === cartItem?.deliveryOptionId,
	);

	if (!selectedDeliveryOption) {
		return null;
	}

	const { estimatedDeliveryTimeMs } = selectedDeliveryOption;

	return (
		<div className='delivery-date'>
			Delivery date: {formatDate(estimatedDeliveryTimeMs)}
		</div>
	);
}
