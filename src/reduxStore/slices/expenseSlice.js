import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
    name: "expenses",
    initialState: {
      items: [],
      totalAmount: 0,
      premiumActivated: false,
    },
    reducers: {
    },
  });
  
  export const { } = expensesSlice.actions;
  
export default expensesSlice.reducer;
