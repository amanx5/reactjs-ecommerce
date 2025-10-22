import './CheckoutPage.css';
import AppContext from '@/context/AppContext';
import { useContext } from 'react';
import CheckoutHeader from './CheckoutHeader';
import CartItem from './components/CartItem';
import PaymentSummary from './components/PaymentSummary';

export default function CheckoutPage() {
	const { cart, setCart } = useContext(AppContext);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/cart.png' />
			<title>Checkout</title>
			<CheckoutHeader />

			<div className='checkout-page'>
				<div className='page-title'>Review your order</div>

				<div className='checkout-grid'>
					<div className='order-summary'>
						{cart.map((cartItem) => (
							<CartItem key={cartItem.id} cartItem={cartItem} />
						))}
					</div>
					<PaymentSummary cart={cart}/>
				</div>
			</div>
		</>
	);
}
