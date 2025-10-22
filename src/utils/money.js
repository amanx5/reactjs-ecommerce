const dollarRate = {
	IST: 90,
};

export const getCurrencyNative = function () {
	return {
		code: 'IST',
		symbol: '₹',
	};
};
export const getPriceNative = function (valueInCents) {
	const { symbol, code } = getCurrencyNative();

	const valueInDollars = valueInCents / 100;
	const valueInNativeCurrency = valueInDollars * dollarRate[code];

	return symbol + ' ' + valueInNativeCurrency.toFixed(2);
};
