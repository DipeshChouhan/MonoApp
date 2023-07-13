import { createSlice } from '@reduxjs/toolkit';
const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    total: 22424,
    expenses: 284
  },
  reducers: {
    incrementTotalBalance: (state, action) => {
      state.total += action.payload;
    },
    incrementExpenses: (state, action) => {
      state.expenses += action.payload;
    }

  }
});

export const { incrementTotalBalance, incrementExpenses } = balanceSlice.actions;
export default balanceSlice.reducer;
