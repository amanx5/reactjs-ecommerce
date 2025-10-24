import { deleteCartItem, getPriceNative } from '@/utils';
import { useContext } from 'react';
import CartItemContext from '@/context/CartItemContext';
import AppContext from '@/context/AppContext';
import CheckoutContext from '@/context/CheckoutContext';

export default function Product() {
	const { refreshCart } = useContext(AppContext);
	const { refreshPaymentSummary } = useContext(CheckoutContext);
	const { cartItem } = useContext(CartItemContext);
	const { product, quantity, deliveryOptionId, createdAt, updatedAt } =
		cartItem || {};
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
					<span className='delete-quantity-link link-primary' onClick={deleteLinkOnClick}>
						Delete
					</span>
				</div>
			</div>
		</>
	);

	async function deleteLinkOnClick () {
		const isDeleted = await deleteCartItem(id);
        if (isDeleted) {
            refreshCart();
            refreshPaymentSummary();
        }
	}
}

