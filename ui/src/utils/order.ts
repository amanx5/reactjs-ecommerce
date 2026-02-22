import type { OrderExpanded, OrderItemExpanded } from '@/types';
import { formatDate } from './date';

export const orderStatusMap: Record<string, number> = {
	created: 10,
	shipped: 50,
	outForDelivery: 80,
	deliveryDelayed: 90,
	delivered: 100,
};

export const calculateOrderStatus = function (
	order: OrderExpanded,
	orderItem: OrderItemExpanded,
) {
	const { created, shipped, outForDelivery, deliveryDelayed, delivered } =
		orderStatusMap;

	const { orderTimeMs } = order;
	const { estimatedDeliveryTimeMs, deliveredOnTimeMs } = orderItem;
	const totalDeliveryTimeMs = estimatedDeliveryTimeMs - orderTimeMs;

	if (deliveredOnTimeMs || totalDeliveryTimeMs === 0) {
		return delivered;
	} else if (Date.now() > estimatedDeliveryTimeMs) {
		return deliveryDelayed;
	} else {
		const timePassedMs = Date.now() - orderTimeMs;
		const timeFraction = (timePassedMs / totalDeliveryTimeMs) * 100;
		const isBetween = (num: number, min: number, max: number) => num >= min && num <= max;

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
	order: OrderExpanded,
	orderItem: OrderItemExpanded,
	orderStatus?: number,
) {
	orderStatus ??= calculateOrderStatus(order, orderItem);
	const { orderTimeMs } = order;
	const { created, shipped, outForDelivery, deliveryDelayed, delivered } =
		orderStatusMap;
	const { estimatedDeliveryTimeMs, deliveredOnTimeMs } = orderItem;
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
			subHeading = 'Delivered' + (deliveredOnTimeMs ? " on " + formatDate(deliveredOnTimeMs) : '');
			break;
	}

	return { heading, subHeading };
};
