import { createSlice } from "@reduxjs/toolkit";

const expenseListSlice = createSlice({
	name: "expenseList",
	initialState: [],
	reducers: {
		updateExpenseList: (state, action) => {
      return action.payload;

		},
		addExpenseToList: (state, action) => {
      return [action.payload, ...state];
		},
	},
});

export const { updateExpenseList, addExpenseToList } = expenseListSlice.actions;
export default expenseListSlice.reducer;
