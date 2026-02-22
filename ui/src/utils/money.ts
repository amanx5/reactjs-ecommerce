const dollarRate: Record<string, number> = {
	IST: 90,
};

export const getCurrencyNative = function () {
	return {
		code: 'IST',
		symbol: '₹',
	};
};
export const getPriceNative = function (valueInCents: number) {
	const { symbol, code } = getCurrencyNative();

	const valueInDollars = valueInCents / 100;
	const valueInNativeCurrency = valueInDollars * dollarRate[code];

	return valueInNativeCurrency < 0
		? `-${symbol}${(valueInNativeCurrency * -1).toFixed(2)}`
		: `${symbol}${valueInNativeCurrency.toFixed(2)}`;
};
