import './OrdersPage.css';
import Header from '@/components/Header.jsx';
import Order from './components/Order.jsx';
import { useContext, useEffect, useState } from 'react';
import { refreshStateViaAPI } from '@/utils';
import AppContext from '@/context/AppContext';

export default function OrdersPage() {
	const { setError } = useContext(AppContext);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		refreshStateViaAPI('orders?expand=products', setOrders, setError);
	}, [setError]);

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
