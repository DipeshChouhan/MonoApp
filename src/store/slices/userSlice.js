import { createSlice } from "@reduxjs/toolkit";

// state
// {
//   name, email, url, totalBalance, income, expenses
// }

const userSlice = createSlice({
	name: "userData",
	initialState: {
		user: null,
		userBalance: 0,
		userIncome: 0,
		userExpenses: 0,
	},
	reducers: {
		setUser(state, action) {
			state["user"] = action.payload;
		},

    setUserAccount(state, action) {
      state.userBalance = action.payload.balance;
      state.userIncome = action.payload.income;
      state.userExpenses = action.payload.expenses;
    },

		setUserBalance(state, action) {
			state["userBalance"] = action.payload;
		},

		setUserIncome(state, action) {
			state["userIncome"] = action.payload;
		},

		setUserExpenses(state, action) {
			state["userExpenses"] = action.payload;
		},
		decrementUserBalance(state, action) {
			state["userBalance"] -= action.payload;
		},
    incrementUserExpenses(state, action) {
      state["userExpenses"] += action.payload;
    },
	},
});

export const { setUser, setUserBalance, setUserIncome, setUserExpenses, decrementUserBalance, incrementUserExpenses, setUserAccount } =
	userSlice.actions;
export default userSlice.reducer;
