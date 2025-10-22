import './OrdersPage.css';
import Header from '@/components/Header.jsx';
import Order from './components/Order.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		fetchOrders();
	}, []);

	async function fetchOrders() {
		const response = await axios.get('/api/orders?expand=products');
		if (response.data) {
			console.log('fetched orders: ', response.data);
			setOrders(response.data);
		}
	}

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/orders.png' />
			<title>Orders</title>
			<Header />
			<div className='orders-page'>
				<div className='page-title'>Your Orders</div>

				<div className='orders-grid'>
					{orders.map((order) => (
						<Order key={order.id} order={order}/>
					))}
				</div>
			</div>
		</>
	);
}
