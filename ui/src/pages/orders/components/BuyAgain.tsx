import BuyAgainIcon from '@/assets/icons/buy-again.png';
import { addNewCartItem, refreshStateViaAPI } from '@/utils';
import type { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';

interface BuyAgainProps {
	product: Product;
	quantity: number;
}

export default function BuyAgain({ product }: BuyAgainProps) {
	const { id } = product;
	const { cart, setCart } = useCart();
	const { setToast } = useToast();
	const isAlreadyInCart = cart?.find(
		(cartItem) => cartItem.product.id === id,
	);
	return isAlreadyInCart ? (
		'Present in Cart'
	) : (
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
			quantity: 1,
		};

		const isAdded = await addNewCartItem(data, setToast);
		if (isAdded) {
			refreshStateViaAPI(
				'/api/cartItems?expand=product',
				setCart,
				{
					setToast,
					when: 'onFailure',
				},
			);
		}
	}
}
