import './Header.css';

import LogoWhite from '../assets/logo/logo-white.png'
import MobileLogoWhite from '../assets/logo/mobile-logo-white.png'
import CartIcon  from '../assets/icons/cart-icon.png'
import { NavLink } from 'react-router';
import { useContext } from 'react';
import AppContext from '@/context/AppContext';
import { getTotalCartItems } from '@/utils';
import SearchBar from './header/SearchBar';

export default function Header() {
	const {cart, setCart} = useContext(AppContext);
	const totalCartItems = getTotalCartItems(cart);

	return (
		<div className='header'>
			<div className='left-section'>
				<NavLink to='/' className='header-link'>
					<img className='logo' src={LogoWhite} />
					<img
						className='mobile-logo'
						src={MobileLogoWhite}
					/>
				</NavLink>
			</div>

			<div className='middle-section'>
				<SearchBar />
			</div>

			<div className='right-section'>
				<NavLink className='orders-link header-link' to='/orders'>
					<span className='orders-text'>Orders</span>
				</NavLink>

				<NavLink className='cart-link header-link' to='/checkout'>
					<img
						className='cart-icon'
						src={CartIcon}
					/>
					<div className='cart-quantity'>{totalCartItems}</div>
					<div className='cart-text'>Cart</div>
				</NavLink>
			</div>
		</div>
	);
}
