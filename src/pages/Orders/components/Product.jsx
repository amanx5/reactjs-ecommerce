import { formatDate } from '@/utils';
import { Link } from 'react-router';
import BuyAgain from '@/assets/icons/buy-again.png';
import Actions from './Actions';

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
					{'Arriving on: ' + formatDate(estimatedDeliveryTimeMs)}
				</div>
				<div className='product-quantity'>Quantity: {quantity}</div>
				<button className='buy-again-button button-primary'>
					<img className='buy-again-icon' src={BuyAgain} />
					<span className='buy-again-message'>Add to Cart</span>
				</button>
			</div>

			<Actions order={order} productId={productId} />
		</>
	);
};
