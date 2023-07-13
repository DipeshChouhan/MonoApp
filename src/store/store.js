import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import expenseReducer from "./slices/expenseSlice"
import expenseListReducer from "./slices/expenseListSlice"
import balanceReducer from "./slices/balanceSlice"
import { setUser } from "./slices/userSlice";
const store = configureStore({
	reducer: {
		userData: userReducer,
    expense: expenseReducer,
    expenseList: expenseListReducer,
    balance: balanceReducer,
	},
});

export { store };
export { setUser };
