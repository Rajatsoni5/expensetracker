import { createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth");

const initialState = storedAuth ? JSON.parse(storedAuth) : { user: null, userID: "", bearerToken: "", isLoggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.userID = action.payload.userID;
      state.bearerToken = action.payload.bearerToken;
      state.isLoggedIn = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          userID: action.payload.userID,
          bearerToken: action.payload.bearerToken,
          isLoggedIn: true,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.userID = "";
      state.bearerToken = "";
      state.isLoggedIn = false;
      localStorage.removeItem("auth");
    },
    updatePasswordState: (state, action) => {
      state.user = { ...state.user, passwordUpdated: action.payload };
    },
    
  },
  
});

export const { login, logout, updatePasswordState } = authSlice.actions;
export default authSlice.reducer;
