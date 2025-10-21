import './Header.css';

import LogoWhite from '../assets/logo/logo-white.png'
import MobileLogoWhite from '../assets/logo/mobile-logo-white.png'
import SearchIcon  from '../assets/icons/search-icon.png'
import CartIcon  from '../assets/icons/cart-icon.png'

import { NavLink } from 'react-router';

export default function HomeHeader() {
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
				<input
					className='search-bar'
					type='text'
					placeholder='Search'
				/>

				<button className='search-button'>
					<img
						className='search-icon'
						src={SearchIcon}
					/>
				</button>
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
					<div className='cart-quantity'>3</div>
					<div className='cart-text'>Cart</div>
				</NavLink>
			</div>
		</div>
	);
}
