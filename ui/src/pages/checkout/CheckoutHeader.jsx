import './CheckoutHeader.css';
import { NavLink } from 'react-router';
import LogoGreen from '../../assets/logo/logo.png'
import MobileLogoGreen from '../../assets/logo/mobile-logo.png'
import CheckoutLock from '../../assets/icons/Checkout-lock-icon.png'
import { useContext } from 'react';
import AppContext from '@/context/AppContext';
import { getTotalCartItems } from '@/utils';

export default function CheckoutHeader() {
	const {cart, setCart} = useContext(AppContext);
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
