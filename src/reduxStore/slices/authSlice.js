import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
      isLoggedIn: false,
      userId: null,
      token: null,
    },
    reducers: {
     
    },
  });
  
  export const { } = authSlice.actions;
  export default authSlice.reducer;

  