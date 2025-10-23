export default function ProductDetails({ orderProduct }) {
	const { quantity, product = {} } = orderProduct;
	const { name, image } = product;

	return (
		<>
			<div className='product-info'>{name}</div>
			<div className='product-info'>Quantity: {quantity}</div>
			<img className='product-image' src={image} />
		</>
	);
}
