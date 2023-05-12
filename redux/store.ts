import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});
