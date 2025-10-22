import { formatDate } from '@/utils';
import { getPriceNative } from '@/utils';

export default function DeliveryOptions({ cartItem, deliveryOptions }) {
    const {productId, deliveryOptionId} = cartItem;

	return (
		<div className='delivery-options'>
			<div className='delivery-options-title'>
				Choose a delivery option:
			</div>

			{deliveryOptions?.length && deliveryOptions.map(({ id, deliveryDays, priceCents, estimatedDeliveryTimeMs }) => (
				<div key={id} className='delivery-option'>
					<input
						type='radio'
						className='delivery-option-input'
						name={productId}
                        checked={id === deliveryOptionId}
					/>
					<div>
						<div className='delivery-option-date'>
							{formatDate(new Date(estimatedDeliveryTimeMs))}
						</div>
						<div className='delivery-option-price'>
							{priceCents ? getPriceNative(priceCents) : 'FREE Shipping'}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
