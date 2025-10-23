import { formatDate } from "@/utils";
import ProductDetails from "./ProductDetails";

export default function TrackingDetails({ order, productId }) {
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
            <ProductDetails orderProduct={orderProduct} />
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