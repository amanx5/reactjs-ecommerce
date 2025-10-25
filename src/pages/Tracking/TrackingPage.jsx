import './TrackingPage.css';
import Header from '@/components/Header.jsx';
import { setStateFromAPIResponse } from '@/utils';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import TrackingDetails from './components/TrackingDetails';

export default function TrackingPage() {
	const [order, setOrder] = useState(null);
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('orderId');
	const productId = searchParams.get('productId');

	useEffect(() => {
		const api = `orders/${orderId}?expand=products`;
		setStateFromAPIResponse(api, setOrder);
	}, [orderId]);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/orders.png' />
			<title>Track Package</title>
			<Header />

			<div className='tracking-page'>
				{order ? (
					<div className='order-tracking'>
						<ViewAllOrders />
						<TrackingDetails order={order} productId={productId} />
					</div>
				) : (
					'Loading...'
				)}
			</div>
		</>
	);
}

function ViewAllOrders() {
	return (
		<Link className='back-to-orders-link link-primary' to='/orders'>
			View all orders
		</Link>
	);
}




