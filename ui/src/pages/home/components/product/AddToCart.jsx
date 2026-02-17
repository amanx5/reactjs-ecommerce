import { addNewCartItem, refreshStateViaAPI } from '@/utils';
import AppContext from '@/context/AppContext';
import { useContext, useRef, useState } from 'react';

export default function AddToCart({ product, quantity }) {
	const { id } = product;
	const { setCart, setError } = useContext(AppContext);
	const [isAdded, setIsAdded] = useState(false);
	const addedToCart = useRef(null);

	return (
		<>
			<div
				ref={addedToCart}
				style={{opacity: isAdded?1:0}}
				className='added-to-cart'>
				<img src='images/icons/checkmark.png' />
				Added
			</div>
			<button
				className='add-to-cart-button button-primary'
				data-testid="AddToCart"
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

		const isAdded = await addNewCartItem(data);
		if (isAdded) {
			refreshStateViaAPI('cart?expand=product', setCart, setError);
			setIsAdded(true);
			setTimeout(()=>{
				setIsAdded(false);
			}, 2000)
		}
	}
}
