import { formatDate, getPriceNative } from '@/utils';
import { Link } from 'react-router';
import BuyAgain from '@/assets/icons/buy-again.png';

export default function Order({ order }) {
	const { products } = order;

	return (
		<>
			<div className='order-container'>
				<OrderHeader order={order} />
				<div className='order-details-grid'>
					{products.map((productOrder) => (
						<ProductOrderItem
							key={productOrder.id || productOrder.productId}
							order={order}
							productOrder={productOrder}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function OrderHeader({ order }) {
	const { id, createdAt, orderTimeMs, totalCostCents, updatedAt } = order;

	return (
		<>
			<div className='order-header'>
				<div className='order-header-left-section'>
					<div className='order-date'>
						<div className='order-header-label'>Order Placed:</div>
						<div>{formatDate(orderTimeMs)}</div>
					</div>
					<div className='order-total'>
						<div className='order-header-label'>Total:</div>
						<div>{getPriceNative(totalCostCents)}</div>
					</div>
				</div>

				<div className='order-header-right-section'>
					<div className='order-header-label'>Order ID:</div>
					<div>{id}</div>
				</div>
			</div>
		</>
	);
}

function ProductOrderItem({ order, productOrder }) {
	const { product, productId, quantity, estimatedDeliveryTimeMs } = productOrder;
	const {name, image} = product;
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

			<div className='product-actions'>
				<Link to='/tracking'>
					<button className='track-package-button button-secondary'>
						Track package
					</button>
				</Link>
			</div>
		</>
	);
}
