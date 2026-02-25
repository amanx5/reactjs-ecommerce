import './OrdersPage.css';
import Header from '@/components/Header';
import OrderComponent from './components/Order';
import { useEffect, useState } from 'react';
import { refreshStateViaAPI } from '@/utils';
import { type OrderExpanded } from '@/types';
import { useToast } from '@/hooks/useToast';

export default function OrdersPage() {
	const { setToast } = useToast();
	const [orders, setOrders] = useState<OrderExpanded[]>([]);
	const hasOrders = Array.isArray(orders) && orders.length > 0;

	useEffect(() => {
		refreshStateViaAPI<OrderExpanded[]>(
			'/api/orders?expand=products',
			setOrders,
			{
				setToast,
				when: 'onFailure',
			},
		);
	}, [setToast]);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/orders.png' />
			<title>Orders</title>
			<Header />
			<div className='orders-page'>
				<div className='page-title'>Your Orders</div>

				{hasOrders ? (
					<div className='orders-grid'>
						{orders.map((order) => (
							<OrderComponent key={order.id} order={order} />
						))}
					</div>
				) : (
					<div>No orders found</div>
				)}
			</div>
		</>
	);
}
