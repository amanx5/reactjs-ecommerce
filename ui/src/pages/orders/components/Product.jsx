import { getOrderTrackingInfo } from '@/utils';
import Actions from './Actions';
import BuyAgain from './BuyAgain';

export default function Product ({ order, orderProduct }) {
	const { product, quantity, estimatedDeliveryTimeMs } = orderProduct;
	const { id: productId, name, image } = product;
	
	return (
		<>
			<div className='product-image-container'>
				<img src={image} />
			</div>

			<div className='product-details'>
				<div className='product-name'>{name}</div>
				<div className='product-delivery-date'>
					{getOrderTrackingInfo(order, orderProduct).subHeading}
				</div>
				<div className='product-quantity'>Quantity: {quantity}</div>
				<BuyAgain product={product} quantity={quantity}/>
			</div>

			<Actions order={order} productId={productId} />
		</>
	);
};
