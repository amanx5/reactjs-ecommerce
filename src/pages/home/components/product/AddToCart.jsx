import { addNewCartItem } from '@/utils';
import AppContext from '@/context/AppContext';
import { useContext, useRef } from 'react';

export default function AddToCart({ product, quantity }) {
	const { id } = product;
	const { refreshCart } = useContext(AppContext);
	const addedToCart = useRef(null);
	return (
		<>
			<div
				ref={addedToCart} 
				className='added-to-cart'>
				<img src='images/icons/checkmark.png' />
				Added
			</div>
			<button
				className='add-to-cart-button button-primary'
				onClick={addToCartOnClick}
			>
				Add to Cart
			</button>
		</>
	);

	async function addToCartOnClick() {
		const data = {
			productId: id,
			quantity,
		};

		const isAdded = await addNewCartItem(data, refreshCart);
		if (isAdded) {
			refreshCart();
			const addedToCartEl = addedToCart.current;
			addedToCartEl.style.opacity=1;
		}
	}
}
