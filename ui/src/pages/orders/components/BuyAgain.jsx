import BuyAgainIcon from '@/assets/icons/buy-again.png';
import AppContext from '@/context/AppContext';
import { addNewCartItem, refreshStateViaAPI } from '@/utils';
import { useContext } from 'react';

export default function BuyAgain({product, quantity}) {
    const { id } = product;
    const { setCart, setError } = useContext(AppContext);
    
	return (
		<button
			className='buy-again-button button-primary'
			onClick={addToCartOnClick}
		>
			<img className='buy-again-icon' src={BuyAgainIcon} />
			<span className='buy-again-message'>Add to Cart</span>
		</button>
	);

	async function addToCartOnClick() {
		const data = {
			productId: id,
			quantity,
		};

		const isAdded = await addNewCartItem(data);
		if (isAdded) {
			refreshStateViaAPI('cart-items?expand=product', setCart, setError);
		}
	}
}
