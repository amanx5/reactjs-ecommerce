import './CheckoutHeader.css';
import { NavLink } from 'react-router';
import LogoGreen from '../../assets/logo/logo.png'
import MobileLogoGreen from '../../assets/logo/mobile-logo.png'
import CheckoutLock from '../../assets/icons/Checkout-lock-icon.png'
export default function CheckoutHeader() {
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
						3 items
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
