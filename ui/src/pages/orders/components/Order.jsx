import OrderHeader from './OrderHeader';
import Product from './Product';

export default function Order({ order }) {
	const { orderItems } = order;

	return (
		<>
			<div className='order-container'>
				<OrderHeader order={order} />
				<div className='order-details-grid'>
					{orderItems.map((orderItem) => (
						<Product
							order={order}
							key={orderItem.productId}
							orderItem={orderItem}
						/>
					))}
				</div>
			</div>
		</>
	);
}
