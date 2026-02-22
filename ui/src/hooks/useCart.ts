import { useContext } from 'react';
import { AppContext, type Cart, type SetCart } from '@/context/AppContext';

export function useCart(): {
	cart: Cart;
	setCart: SetCart;
} {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useCart must be used within an AppContext.Provider');
	}

	const { cart, setCart } = context;

	return {
		cart,
		setCart,
	};
}
