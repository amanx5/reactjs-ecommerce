import { formatDate, getDeliveryDateHeading, getProgress } from "@/utils";
import ProductDetails from "./ProductDetails";

export default function TrackingDetails({ order, productId }) {
    const { products: orderProducts = [] } = order;
    const orderProduct = orderProducts.find(
        (orderProduct) => orderProduct.productId === productId
    );

	const progress = getProgress(order, productId);

    return (
        <>
            <ProgressHeading orderProduct={orderProduct} progress={progress} />
            <ProductDetails orderProduct={orderProduct} />
            <ProgressLabels progress={progress} />
            <ProgressBar progress={progress} />
        </>
    );
}

function ProgressHeading({ orderProduct, progress }) {
	const heading = getDeliveryDateHeading(orderProduct, progress);

	return <div className='delivery-date'>{heading}</div>;
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