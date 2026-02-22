export const addDaysToDate = function (date: number, days: number) {
	if (date) {
		const newDate = new Date(date);
		return newDate.setDate(newDate.getDate() + days);
	}
};

export const formatDate = function (date: number, formatOptions?: Intl.DateTimeFormatOptions) {
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
