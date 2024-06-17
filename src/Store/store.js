import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/Slices/booksSlice";
import authReducer from "../features/Slices/authSlice";
import loanReducer from "../features/Slices/loanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    loans: loanReducer,
  },
});

export default store;