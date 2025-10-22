import { Routes, Route } from 'react-router';
import './App.css';
import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import TrackingPage from './pages/tracking/TrackingPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import AppContext from '@/context/AppContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		fetchCartItems();
	}, []);


	async function fetchCartItems() {
		const response = await axios.get('/api/cart-items?expand=product');
		const data = response.data;
		if (data?.length) {
			setCart(data);
		}
	}
	return (
		<AppContext.Provider value={{cart, setCart}}>
			<Routes>
				<Route index element={<HomePage/>} />
				<Route path="checkout" element={<CheckoutPage/>} />
				<Route path="orders" element={<OrdersPage/>} />
				<Route path="tracking" element={<TrackingPage/>} />
				<Route path="*" element={<NotFoundPage/>} />
			</Routes>
		</AppContext.Provider>
	);
}

export default App;
