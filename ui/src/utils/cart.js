import { apiRequest } from './utility';

export const getCheckoutHeading = function (cart) {
	if (cart === null) {
		return 'Loading...';
	} else if (Array.isArray(cart)) {
		if (cart.length) {
			return 'Review your order';
		} else {
			return 'Cart is Empty!';
		}
	} else {
		return 'Failed to load cart.';
	}
}

export const getTotalCartItems = function (cart) {
	if ((Array.isArray(cart))) {
		return cart.reduce((acc, curr) => (acc += curr.quantity), 0);
	} else {
		return 0;
	}
};

export const addNewCartItem = async function (data) {
	const { success } = await apiRequest('cart', data, 'post');

	if (success) {
		return true;
	}
};

export const deleteCartItem = async function (productId) {
	const api = `cart/${productId}`;
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

	const api = `cart/${productId}`;

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
