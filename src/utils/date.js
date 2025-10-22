export const addDaysToDate = function (date, days) {
	const newDate = date ? new Date(date) : new Date();
	return newDate.setDate(newDate.getDate() + days);
};

export const formatDate = function (date, formatOptions) {
	const newDate  = date ? new Date(date) : new Date();
	formatOptions ??= {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
	};

	return newDate.toLocaleDateString('en-US', formatOptions);
};
