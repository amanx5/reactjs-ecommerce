import { CartItemExpanded } from '@/types';

interface ProductDetailsProps {
	orderItem: CartItemExpanded;
}

export default function ProductDetails({ orderItem }: ProductDetailsProps) {
	const { quantity, product } = orderItem;
	const { name, image } = product;

	return (
		<>
			<div className='product-info'>{name}</div>
			<div className='product-info'>Quantity: {quantity}</div>
			<img className='product-image' src={image} />
		</>
	);
}
