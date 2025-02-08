import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import expensesSlice from './slices/expenseSlice';

const store = configureStore({
    reducer: {
      auth: authSlice,
      expenses: expensesSlice,
    },
  });
export default store;
