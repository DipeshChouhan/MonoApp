import LocalStorage from "./localStorage";

const MImageConstants = {
	UPWORK: 0,
	TRANSFER: 1,
	PAYPAL: 2,
	YOUTUBE: 3,
	Food: 4,
	Spending: 5,
	Entertainment: 6,
	Transport: 7,
	Utilities: 8,
	Health: 9,
	Investment: 10,
	Insurance: 11,
	Other: 12,
};

const MImages = [
	require("../assets/upwork.png"),
	require("../assets/woman.png"),
	require("../assets/paypl.png"),
	require("../assets/youtube.png"),
	require("../assets/categories/food.png"),
	require("../assets/categories/spending.png"),
	require("../assets/categories/entertainment.png"),
	require("../assets/categories/transport.png"),
	require("../assets/categories/utilities.png"), require("../assets/categories/health.png"), require("../assets/categories/investing.png"),
	require("../assets/categories/insurance.png"),
	require("../assets/categories/other.png"),
];

const MNames = [
	"Upwork",
	"Transfer",
	"Paypal",
	"Youtube",
	"Food",
	"Spending",
	"Entertainment",
	"Transport",
	"Utilities",
	"Health",
	"Investment",
	"Insurance",
	"Other",
];

const ExpenseCategories = [
	{ name: "Food", img: MImages[MImageConstants.Food] },
	{ name: "Spending", img: MImages[MImageConstants.Spending] },
	{ name: "Entertainment", img: MImages[MImageConstants.Entertainment] },
	{ name: "Transport", img: MImages[MImageConstants.Transport] },
	{ name: "Utilities", img: MImages[MImageConstants.Utilities] },
	{ name: "Health", img: MImages[MImageConstants.Health] },
	{ name: "Investment", img: MImages[MImageConstants.Investment] },
	{ name: "Insurance", img: MImages[MImageConstants.Insurance] },
	{ name: "Other", img: MImages[MImageConstants.Other] },
];

const setInitailUserData = () => {
	LocalStorage.setItem("userBalance", 2548);
	LocalStorage.setItem("userIncome", 1840);
	LocalStorage.setItem("userExpenses", 284);
};

const defaultExpenses = [
	{
		invoice: "Got money from client on upwork",
		amount: "+$850.00",
		category: 0,
		date: "Feb 01, 2022",
		stamp: 1687260240039,
	},
	{
		invoice: "Transfered the money wife",
		amount: "-$85.00",
		category: 1,
		date: "Jan 31, 2022",
		stamp: 1687260240037,
	},
	{
		invoice: "Recieved salary from company",
		amount: "+$1,406.00",
		category: 2,
		date: "Jan 30, 2022",
		stamp: 1687260240036,
	},
	{
		invoice: "Bought YouTube Premium",
		amount: "-$11.00",
		category: 3,
		date: "Jan 29, 2022",
		stamp: 1687260240035,
	},
];

export {
	MImages,
	MImageConstants,
	ExpenseCategories,
	MNames,
	setInitailUserData,
	defaultExpenses,
};
