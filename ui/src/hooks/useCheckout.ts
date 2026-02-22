import { useContext } from 'react';
import { CheckoutContext, type CheckoutContextType } from '@/context/CheckoutContext';

export function useCheckout(): CheckoutContextType {
	const context = useContext(CheckoutContext);
	if (!context) {
		throw new Error('useCheckout must be used within an CheckoutContext.Provider');
	}

	return context;
}