import CartItem from './ordersummary/CartItem.jsx';
import AppContext from '@/context/AppContext';
import { useContext } from 'react';

export default function OrderSummary() {
    const { cart } = useContext(AppContext);
    
	return (
		<div className='order-summary'>
			{cart?.map?.((cartItem) => (
				<CartItem key={cartItem.id} cartItem={cartItem} />
			))}
		</div>
	);
}
