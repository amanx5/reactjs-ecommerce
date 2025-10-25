import OrderHeader from './OrderHeader';
import Product from './Product';

export default function Order({ order }) {
	const { products: orderProducts } = order;

	return (
		<>
			<div className='order-container'>
				<OrderHeader order={order} />
				<div className='order-details-grid'>
					{orderProducts.map((orderProduct) => (
						<Product
							order={order}
							key={orderProduct.productId}
							orderProduct={orderProduct}
						/>
					))}
				</div>
			</div>
		</>
	);
}

