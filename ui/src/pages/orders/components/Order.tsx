import OrderHeader from './OrderHeader';
import Product from './Product';
import { OrderExpanded } from '@/types';

export default function Order({ order }: { order: OrderExpanded }) {
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
