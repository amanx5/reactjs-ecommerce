import { createContext, Dispatch, SetStateAction } from 'react';
import { ToastData, CartItemExpanded } from '@/types';

export type Cart = CartItemExpanded[];
export type SetCart = Dispatch<SetStateAction<CartItemExpanded[]>>;
export type Toast = ToastData | null;
export type SetToast = Dispatch<SetStateAction<ToastData | null>>;

export interface AppContextType {
	cart: Cart;
	toast: Toast;
	setCart: SetCart;
	setToast: SetToast;
}

export const AppContext = createContext<AppContextType | null>(null);
