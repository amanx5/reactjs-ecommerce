import {
	calculateOrderStatus,
	getOrderTrackingInfo,
	orderStatusMap,
} from '@/utils';
import ProductDetails from './ProductDetails';

export default function TrackingDetails({ order, productId }) {
	const { orderItems = [] } = order;
	const orderItem = orderItems.find(
		(orderItem) => orderItem.productId === productId,
	);
	// TODO - Return status from order api
	const orderStatus = calculateOrderStatus(order, orderItem);

	return (
		<div className='order-tracking'>
			<ProgressHeading
				order={order}
				orderItem={orderItem}
				orderStatus={orderStatus}
			/>
			<ProductDetails orderItem={orderItem} />
			<ProgressLabels orderStatus={orderStatus} />
			<ProgressBar orderStatus={orderStatus} />
		</div>
	);
}

function ProgressHeading({ order, orderItem, orderStatus }) {
	const { heading, subHeading } = getOrderTrackingInfo(
		order,
		orderItem,
		orderStatus,
	);

	return (
		<>
			<div className='heading'>{heading}</div>
			<div className='sub-heading'>{subHeading}</div>
		</>
	);
}

function ProgressLabels({ orderStatus }) {
	const { created, shipped, outForDelivery, deliveryDelayed, delivered } =
		orderStatusMap;
	const stages = [
		{
			text: 'Preparing',
			status: created,
		},
		{
			text: 'Shipped',
			status: shipped,
		},
		{
			text: 'Delivered',
			status: delivered,
		},
	];

	return (
		<div className='progress-labels-container'>
			{stages.map(({ text, status }, index) => (
				<div
					key={index}
					className={
						'progress-label' +
						(status <= orderStatus ? ' completed-status' : '')
					}
				>
					{text}
				</div>
			))}
		</div>
	);
}

function ProgressBar({ orderStatus }) {
	const progressPercentStr = orderStatus + '%';

	return (
		<div className='progress-bar-container'>
			<div
				className='progress-bar'
				style={{ width: progressPercentStr }}
			></div>
		</div>
	);
}
