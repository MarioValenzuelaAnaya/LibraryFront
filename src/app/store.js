import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/tasks/booksSlice";
import authReducer from "../features/tasks/authSlice";
import loanReducer from "../features/tasks/loanSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    loans: loanReducer,
  },
});
