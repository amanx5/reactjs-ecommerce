import './TrackingPage.css';
import Header from '@/components/Header.jsx';
import { refreshStateViaAPI } from '@/utils';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import TrackingDetails from './components/TrackingDetails';
import { useToast } from '@/hooks/useToast';

export default function TrackingPage() {
	const { setToast } = useToast();
	const [order, setOrder] = useState(null);
	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('orderId');
	const productId = searchParams.get('productId');

	useEffect(() => {
		refreshStateViaAPI(`/api/orders/${orderId}?expand=products`, setOrder, {
			setToast,
			when: 'onFailure',
		});
	}, [orderId, setToast]);

	return (
		<>
			<link rel='icon' type='image/png' href='favicon/orders.png' />
			<title>Track Package</title>
			<Header />

			<div className='tracking-page'>
				{order ? (
					<>
						<ViewAllOrders />
						{productId ? (
							<TrackingDetails
								order={order}
								productId={productId}
							/>
						) : (
							<Link to='/orders'>
								Go to order details page to track package.
							</Link>
						)}
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
