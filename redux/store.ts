import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import chatSlice from "./slices/chatSlice";
import imageSlice from "./slices/imageSlice";
import chatListSlice from "./slices/chatListFilterSlice";
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    user: userSlice,
    chat: chatSlice,
    image: imageSlice,
    chatListFilter: chatListSlice,
  },
});
