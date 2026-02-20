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
};

export const getTotalCartItems = function (cart) {
	if (Array.isArray(cart)) {
		return cart.reduce((acc, curr) => (acc += curr.quantity), 0);
	} else {
		return 0;
	}
};

export const addNewCartItem = async function (data) {
	const { success } = await apiRequest('/api/cartItems', data, 'post');

	if (success) {
		return true;
	}
};

export const deleteCartItem = async function (productId) {
	const { success } = await apiRequest(
		`/api/cartItems/${productId}`,
		null,
		'delete',
	);

	if (success) {
		return true;
	}
};

export const updateDeliveryOption = async function (
	deliveryOptionId,
	productId,
) {
	const data = {
		deliveryOptionId,
	};

	const { success } = await apiRequest(
		`/api/cartItems/${productId}`,
		data,
		'put',
	);

	if (success) {
		return true;
	}
};

export const placeOrder = async function () {
	const { success } = await apiRequest('/api/orders', null, 'post');

	if (success) {
		return true;
	}
};
