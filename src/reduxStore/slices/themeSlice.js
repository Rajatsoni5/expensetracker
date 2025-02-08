import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  isDarkMode: false, 
  isPremium: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    activatePremium(state) {
        state.isPremium = true; 
    },
    },
});

export const { toggleTheme,activatePremium } = themeSlice.actions;
export default themeSlice.reducer;
