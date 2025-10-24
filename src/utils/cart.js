import { apiRequest } from './utility';

export const getTotalCartItems = function (cart) {
	return cart.reduce((acc, curr) => (acc += curr.quantity), 0);
};

export const addNewCartItem = async function (data) {
	const { success } = await apiRequest('cart-items', data, 'post');

	if (success) {
		return true;
	}
};

export const deleteCartItem = async function (productId) {
	const url = `cart-items/${productId}`;
	const { success } = await apiRequest(url, null, 'delete');

	if (success) {
		return true;
	}
};

export const updateDeliveryOption = async function (
	deliveryOptionId,
	productId
) {
	const data = {
		deliveryOptionId,
	};

	const url = `cart-items/${productId}`;

	const { success } = await apiRequest(url, data, 'put');

	if (success) {
		return true;
	}
};
