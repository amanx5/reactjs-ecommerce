import { createContext, Dispatch, SetStateAction } from 'react';
import { PaymentSummaryData } from '@/types';

export type SetPaymentSummary = Dispatch<SetStateAction<PaymentSummaryData | null>>;

export interface CheckoutContextType {
	paymentSummary: PaymentSummaryData | null;
	setPaymentSummary: SetPaymentSummary;
}

export const CheckoutContext = createContext<CheckoutContextType | null>(null);