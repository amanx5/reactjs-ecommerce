import { formatDate } from "@/utils";
import { useContext } from "react";
import CartItemContext from "@/context/CartItemContext";

export default function DeliveryDate() {
	const { cartItem, deliveryOptions } = useContext(CartItemContext);
	const selectedDeliveryOption = deliveryOptions.find(
		(deliveryOption) => deliveryOption?.id === cartItem?.deliveryOptionId
	);
	const { estimatedDeliveryTimeMs } = selectedDeliveryOption || {};
	
	return (
		<div className='delivery-date'>
			Delivery date: {formatDate(estimatedDeliveryTimeMs)}
		</div>
	);
}
