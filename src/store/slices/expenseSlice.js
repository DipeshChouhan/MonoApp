import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
	name: "expense",
	initialState: {
		category: 4,
		amount: "",
		date: new Date().toDateString(),
		invoice: "",
		title: "", }, reducers: {
		setExpenseCategory(state, action) {
			state["category"] = action.payload;
		},
		setExpenseAmount(state, action) {
			state["amount"] = action.payload;
		},
		setExpenseDate(state, action) {
			state["date"] = action.payload;
		},
		setExpenseInvoice(state, action) {
			state["invoice"] = action.payload;
		},
		setExpenseTitle(state, action) {
			state["title"] = action.payload;
		},
    updateExpenseState(state, action) {
      return action.payload;
    },
		resetExpense(state, action) {
			return {
				category: 4,
				amount: "",
				date: new Date().toDateString(),
				invoice: "",
				title: "",
			};
		},
	},
});


export const {
	setExpenseCategory,
	setExpenseDate,
	setExpenseInvoice,
	setExpenseAmount,
	setExpenseTitle,
  resetExpense,
  updateExpenseState,
} = expenseSlice.actions;
export default expenseSlice.reducer;
