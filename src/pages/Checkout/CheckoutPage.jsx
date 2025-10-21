import './CheckoutPage.css';

import CheckoutHeader from './CheckoutHeader';
import CartItem from './CartItem';
import { AppContext } from '../../contexts';
import { useContext } from 'react';

export default function CheckoutPage() {
	const { cart, setCart } = useContext(AppContext);
	console.log('cart = ', cart);

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

					<div className='payment-summary'>
						<div className='payment-summary-title'>
							Payment Summary
						</div>

						<div className='payment-summary-row'>
							<div>Items (3):</div>
							<div className='payment-summary-money'>$42.75</div>
						</div>

						<div className='payment-summary-row'>
							<div>Shipping &amp; handling:</div>
							<div className='payment-summary-money'>$4.99</div>
						</div>

						<div className='payment-summary-row subtotal-row'>
							<div>Total before tax:</div>
							<div className='payment-summary-money'>$47.74</div>
						</div>

						<div className='payment-summary-row'>
							<div>Estimated tax (10%):</div>
							<div className='payment-summary-money'>$4.77</div>
						</div>

						<div className='payment-summary-row total-row'>
							<div>Order total:</div>
							<div className='payment-summary-money'>$52.51</div>
						</div>

						<button className='place-order-button button-primary'>
							Place your order
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
