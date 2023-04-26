import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userSlice,
  },
});
