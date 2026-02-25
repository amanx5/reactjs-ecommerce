import './CheckoutHeader.css';
import { NavLink } from 'react-router';
import LogoGreen from '../../assets/logo/logo.png'
import MobileLogoGreen from '../../assets/logo/mobile-logo.png'
import CheckoutLock from '@/assets/icons/checkout-lock-icon.png'
import { useCart } from '@/hooks/useCart';
import { getTotalCartItems } from '@/utils';

export default function CheckoutHeader() {
	const { cart } = useCart();
	const totalCartItems = getTotalCartItems(cart);

	return (
		<div className="checkout-header">
			<div className='header-content'>
				<div className='checkout-header-left-section'>
					<NavLink to='/'>
						<img className='logo' src={LogoGreen} />
						<img className='mobile-logo' src={MobileLogoGreen} />
					</NavLink>
				</div>

				<div className='checkout-header-middle-section'>
					Checkout (
					<NavLink className='return-to-home-link' to='/'>
						{totalCartItems + ' items'} 
					</NavLink>
					)
				</div>

				<div className='checkout-header-right-section'>
					<img src={CheckoutLock} />
				</div>
			</div>
		</div>
	);
}
