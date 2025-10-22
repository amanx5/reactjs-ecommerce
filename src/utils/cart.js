
export const getTotalCartItems = function (cart) {
	return cart.reduce((acc, curr) => acc += curr.quantity, 0);
}