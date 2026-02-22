import { addNewCartItem, refreshStateViaAPI } from '@/utils';
import { Product, type CartItemExpanded } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';

interface AddToCartProps {
	product: Product;
	quantity: number;
}

export default function AddToCart({ product, quantity }: AddToCartProps) {
	const { id } = product;
	const { setCart } = useCart();
	const { setToast } = useToast();

	return (
		<button
			className='add-to-cart-button button-primary'
			data-testid='AddToCart'
			onClick={addToCartOnClick}
		>
			Add to Cart
		</button>
	);

	async function addToCartOnClick() {
		const data = {
			productId: id,
			quantity,
		};

		const success = await addNewCartItem(data, setToast);
		if (success) {
			refreshStateViaAPI<CartItemExpanded[]>(
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
