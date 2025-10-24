import './App.css';
import HomePage from '@/pages/home/HomePage';
import CheckoutPage from '@/pages/checkout/CheckoutPage';
import OrdersPage from '@/pages/orders/OrdersPage';
import TrackingPage from '@/pages/tracking/TrackingPage';
import NotFoundPage from '@/pages/notfound/NotFoundPage';
import AppContext from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { setStateFromAPIResponse } from '@/utils';

export default function App() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		refreshCart();
	}, []);

	return (
		<AppContext.Provider value={{ cart, setCart, refreshCart }}>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path='checkout' element={<CheckoutPage />} />
				<Route path='orders' element={<OrdersPage />} />
				<Route path='tracking' element={<TrackingPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</AppContext.Provider>
	);

	function refreshCart() {
		const api = '/api/cart-items?expand=product';
		setStateFromAPIResponse(api, setCart);
	}
}

