import { getPriceNative } from "@/utils";

export default function CartProduct ({ cartProduct }) {
	const { product, quantity, deliveryOptionId, createdAt, updatedAt } =
		cartProduct || {};
	const { id, image, name, rating, priceCents, keywords } = product;

	return (
		<>
			<img className='product-image' src={image} />

			<div className='cart-item-details'>
				<div className='product-name'>{name}</div>
				<div className='product-price'>
					{getPriceNative(priceCents)}
				</div>
				<div className='product-quantity'>
					<span>
						Quantity:{' '}
						<span className='quantity-label'>{quantity}</span>
					</span>
					<span className='update-quantity-link link-primary'>
						Update
					</span>
					<span className='delete-quantity-link link-primary'>
						Delete
					</span>
				</div>
			</div>
		</>
	);
};