import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import expensesSlice from './slices/expenseSlice';
import themeSlice from "./slices/themeSlice";


const store = configureStore({
    reducer: {
      auth: authSlice,
      expenses: expensesSlice,
      theme: themeSlice,
    },
  });
export default store;
