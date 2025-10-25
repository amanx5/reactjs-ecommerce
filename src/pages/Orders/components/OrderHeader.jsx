import { formatDate, getPriceNative } from "@/utils";

export default function OrderHeader({ order }) {
	const { id, createdAt, orderTimeMs, totalCostCents, updatedAt } = order;

	return (
		<div className='order-header'>
			<div className='order-header-left-section'>
				<div className='order-date'>
					<div className='order-header-label'>Order Placed:</div>
					<div>{formatDate(orderTimeMs)}</div>
				</div>
				<div className='order-total'>
					<div className='order-header-label'>Total:</div>
					<div>{getPriceNative(totalCostCents)}</div>
				</div>
			</div>

			<div className='order-header-right-section'>
				<div className='order-header-label'>Order ID:</div>
				<div>{id}</div>
			</div>
		</div>
	);
}