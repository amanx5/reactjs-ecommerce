import './App.css';
import HomePage from '@/pages/home/HomePage';
import CheckoutPage from '@/pages/checkout/CheckoutPage';
import OrdersPage from '@/pages/orders/OrdersPage';
import TrackingPage from '@/pages/tracking/TrackingPage';
import NotFoundPage from '@/pages/notfound/NotFoundPage';
import AppContext from '@/context/AppContext';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { refreshStateViaAPI } from '@/utils';
import ErrorPage from './pages/error/ErrorPage';
import { APP_CONSTANTS } from '@/utils';

export default function App() {
	const [error, setError] = useState(null);
	const [cart, setCart] = useState(null);

	useEffect(() => {
		refreshStateViaAPI('cart-items?expand=product', setCart, setError);
	}, []);

	return (
		<AppContext.Provider value={{ error, setError, cart, setCart, APP_CONSTANTS }}>
			{error ? (
				<ErrorPage />
			) : (
				<Routes>
					<Route index element={<HomePage />} />
					<Route path='checkout' element={<CheckoutPage />} />
					<Route path='orders' element={<OrdersPage />} />
					<Route path='tracking' element={<TrackingPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			)}
		</AppContext.Provider>
	);
}