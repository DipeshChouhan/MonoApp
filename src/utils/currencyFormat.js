// write a currency formatter function that takes a number and returns a string using Intl.NumberFormat

const getFormatedCurrency = (number, locale, currency) => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(number);
};

const unformatDollar = (dollar) => {
	return Number(dollar.slice(2).replace(/,/g, ""));
};

const getFormatedDollar = (number) =>
	getFormatedCurrency(number, "en-US", "USD");

export { getFormatedDollar, getFormatedCurrency, unformatDollar };
