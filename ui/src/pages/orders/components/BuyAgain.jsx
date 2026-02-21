import BuyAgainIcon from '@/assets/icons/buy-again.png';
import AppContext from '@/context/AppContext';
import { addNewCartItem, refreshStateViaAPI } from '@/utils';
import { useContext } from 'react';

export default function BuyAgain({ product, quantity }) {
	const { id } = product;
	const { cart, setCart, setError } = useContext(AppContext);
	const isAlreadyInCart = cart?.find(
		(cartItem) => cartItem.product.id === id,
	);
	return (
		isAlreadyInCart ? "Present in Cart" : (
			<button
				className='buy-again-button button-primary'
				onClick={addToCartOnClick}
			>
				<img className='buy-again-icon' src={BuyAgainIcon} />
				<span className='buy-again-message'>Add to Cart</span>
			</button>
		)
	);

	async function addToCartOnClick() {
		const data = {
			productId: id,
			quantity: 1,
		};

		const isAdded = await addNewCartItem(data);
		if (isAdded) {
			refreshStateViaAPI(
				'/api/cartItems?expand=product',
				setCart,
				setError,
			);
		}
	}
}
