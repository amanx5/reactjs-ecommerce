export const addDaysToDate = function (date, days) {
	date ??= new Date();
	return date.setDate(date.getDate() + days);
};

export const formatDate = function (date, formatOptions) {
	date ??= new Date();
	formatOptions ??= {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
	};

	return date.toLocaleDateString('en-US', formatOptions);
};
