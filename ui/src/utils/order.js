import { formatDate } from './date';
import { warnDev } from './utility';

export const orderStatusMap = {
	created: 10,
	shipped: 50,
	outForDelivery: 80,
	deliveryDelayed: 90,
	delivered: 100,
};

function getKeyForOrderStatus(orderStatusNum) {
	return orderStatusMap
		.entries()
		.find(([key, value]) => value === orderStatusNum);
}

export const calculateOrderStatus = function (order, orderProduct) {
	const { created, shipped, outForDelivery, deliveryDelayed, delivered } =
		orderStatusMap;

	const { orderTimeMs } = order;
	const { estimatedDeliveryTimeMs, deliveredOnTimeMs } = orderProduct;
	const totalDeliveryTimeMs = estimatedDeliveryTimeMs - orderTimeMs;

	if (deliveredOnTimeMs || totalDeliveryTimeMs === 0) {
		return delivered;
	} else if (Date.now() > estimatedDeliveryTimeMs) {
		return deliveryDelayed;
	} else {
		const timePassedMs = Date.now() - orderTimeMs;
		const timeFraction = (timePassedMs / totalDeliveryTimeMs) * 100;
		const isBetween = (num, min, max) => num >= min && num <= max;

		if (isBetween(timeFraction, 0, 10)) {
			return created;
		} else if (isBetween(timeFraction, 11, 80)) {
			return shipped;
		} else if (isBetween(timeFraction, 81, 100)) {
			return outForDelivery;
		}
	}
};

export const getOrderTrackingInfo = function (
	order,
	orderProduct,
	orderStatus
) {
	orderStatus ??= calculateOrderStatus(order, orderProduct);
	const { orderTimeMs } = order;
	const { created, shipped, outForDelivery, deliveryDelayed, delivered } =
		orderStatusMap;
	const { estimatedDeliveryTimeMs, deliveredOnTimeMs } = orderProduct;
	let heading, subHeading;

	switch (orderStatus) {
		case created:
			heading = 'Preparing your order.';
			subHeading = 'Order created on ' + formatDate(orderTimeMs);
			break;
		case shipped:
			heading = 'Your order is shipped.';
			subHeading = 'Arriving on ' + formatDate(estimatedDeliveryTimeMs);
			break;
		case outForDelivery:
			heading = 'Out for delivery.';
			subHeading = 'Arriving today between 8am-8pm';
			break;

		case deliveryDelayed:
			heading = 'Order is delayed.';
			subHeading =
				'Failed to deliver on ' + formatDate(estimatedDeliveryTimeMs);
			break;

		case delivered:
			heading = 'Order is delivered.';
			subHeading = 'Delivered on ' + formatDate(deliveredOnTimeMs);
			break;
	}

	return { heading, subHeading };
};
