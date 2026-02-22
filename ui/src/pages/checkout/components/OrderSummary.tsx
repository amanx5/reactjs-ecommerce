import CartItem from './ordersummary/CartItem.jsx';
import { useCart } from '@/hooks/useCart';

export default function OrderSummary() {
	const { cart } = useCart();

	return (
		<div className='order-summary'>
			{cart?.map?.((cartItem) => (
				<CartItem key={cartItem.id} cartItem={cartItem} />
			))}
		</div>
	);
}
