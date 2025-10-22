export const addDaysToDate = function (date, days) {
	if (date) {
		const newDate = new Date(date);
		return newDate.setDate(newDate.getDate() + days);
	}
};

export const formatDate = function (date, formatOptions) {
	if (date) {
		const newDate  = new Date(date);
		formatOptions ??= {
			weekday: 'short',
			day: '2-digit',
			month: 'short',
		};
	
		return newDate.toLocaleDateString('en-US', formatOptions);
	}
};
