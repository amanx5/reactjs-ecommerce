import './TrackingPage.css';
import Header from '@/components/Header.jsx';
import { refreshStateViaAPI } from '@/utils';
import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import TrackingDetails from './components/TrackingDetails';
import AppContext from '@/context/AppContext';

export default function TrackingPage() {
	const { setError } = useContext(AppContext);
	const [order, setOrder] = useState(null);
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('orderId');
	const productId = searchParams.get('productId');

	useEffect(() => {
		refreshStateViaAPI(
			`/api/orders/${orderId}?expand=products`,
			setOrder,
			setError
		);
	}, [orderId, setError]);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/orders.png' />
			<title>Track Package</title>
			<Header />

			<div className='tracking-page'>
				{order ? (
					<>
						<ViewAllOrders />
						<TrackingDetails order={order} productId={productId} />
					</>
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
