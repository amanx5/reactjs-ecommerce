import './TrackingPage.css';
import Header from '@/components/Header.jsx';
import { formatDate, setStateFromAPIResponse } from '@/utils';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';

export default function TrackingPage() {
	const { state: linkState } = useLocation();
	const isIntervalNavigation = !!linkState?.order;
	const orderInitialValue = linkState?.order || null;
	const [order, setOrder] = useState(orderInitialValue);

	const [searchParams] = useSearchParams();
	const orderId = searchParams.get('orderId');
	const productId = searchParams.get('productId');

	useEffect(() => {
		// page was not opened from Track Package button
		// or page was opened from Track Package but later search params are changed
		if (!isIntervalNavigation) {
			const api = `/api/orders/${orderId}?expand=products`;
			setStateFromAPIResponse(api, setOrder);
		}
	}, [orderId, isIntervalNavigation]);

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

function TrackingDetails({ order, productId }) {
	const { orderTimeMs, products: orderProducts = [] } = order;
	const orderProduct = orderProducts.find(
		(orderProduct) => orderProduct.productId === productId
	);

	const { estimatedDeliveryTimeMs } = orderProduct;
	const totalDeliveryTimeMs = Math.max(
		estimatedDeliveryTimeMs - orderTimeMs,
		1 // ensuring totalDeliveryTimeMs is atleast 1ms for cases when (estimatedDeliveryTimeMs - orderTimeMs == 0)
	);
	const timePassedMs = Date.now() - totalDeliveryTimeMs;
	const progress = Math.max((timePassedMs / totalDeliveryTimeMs) * 100, 100);

	return (
		<>
			<ProgressHeading orderProduct={orderProduct} progress={progress} />
			<TrackingProduct orderProduct={orderProduct} />
			<ProgressLabels progress={progress} />
			<ProgressBar progress={progress} />
		</>
	);
}

function ProgressHeading({ orderProduct, progress }) {
	const { estimatedDeliveryTimeMs } = orderProduct;
	const statusText = progress >= 100 ? 'Delivered on' : 'Arriving on';
	const heading = statusText + ' ' + formatDate(estimatedDeliveryTimeMs);

	return <div className='delivery-date'>{heading}</div>;
}

function TrackingProduct({ orderProduct }) {
	const { quantity, product = {} } = orderProduct;
	const { name, image } = product;

	return (
		<>
			<div className='product-info'>{name}</div>
			<div className='product-info'>Quantity: {quantity}</div>
			<img className='product-image' src={image} />
		</>
	);
}

function ProgressLabels({ progress }) {
	const stages = [
		{
			text: 'Preparing',
			isCurrent: progress < 33,
		},
		{
			text: 'Shipped',
			isCurrent: progress > 33 && progress < 100,
		},
		{
			text: 'Delivered',
			isCurrent: progress >= 100,
		},
	];

	return (
		<div className='progress-labels-container'>
			{stages.map(({ text, isCurrent }, index) => (
				<div
					key={index}
					className={
						'progress-label' + (isCurrent ? ' current-status' : '')
					}
				>
					{text}
				</div>
			))}
		</div>
	);
}

function ProgressBar({ progress }) {
	const progressPercentStr = progress + '%';

	return (
		<div className='progress-bar-container'>
			<div
				className='progress-bar'
				style={{ width: progressPercentStr }}
			></div>
		</div>
	);
}
