import { apiRequest } from './utility';

export const checkIsCartEmpty = function (cart) {
	return cart.length === 0;
}

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
	const api = `cart-items/${productId}`;
	const { success } = await apiRequest(api, null, 'delete');

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

	const api = `cart-items/${productId}`;

	const { success } = await apiRequest(api, data, 'put');

	if (success) {
		return true;
	}
};

export const placeOrder = async function () {
	const api = `orders`;
	const { success } = await apiRequest(api, null, 'post');

	if (success) {
		return true;
	}
};
