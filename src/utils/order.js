import { formatDate } from './date';

export const getProgress = function (order, orderProduct) {
	const { orderTimeMs } = order;
	const { estimatedDeliveryTimeMs } = orderProduct;
	const totalDeliveryTimeMs = Math.max(
		estimatedDeliveryTimeMs - orderTimeMs,
		1 // ensuring totalDeliveryTimeMs is atleast 1ms for cases when (estimatedDeliveryTimeMs - orderTimeMs == 0)
	);
	const timePassedMs = Date.now() - totalDeliveryTimeMs;
	const progress = Math.max((timePassedMs / totalDeliveryTimeMs) * 100, 100);

	return progress;
};
export const getDeliveryDateHeading = function (orderProduct, progress) {
	const { estimatedDeliveryTimeMs } = orderProduct;
	const statusText = progress >= 100 ? 'Delivered on' : 'Arriving on';
	return statusText + ' ' + formatDate(estimatedDeliveryTimeMs);
};
