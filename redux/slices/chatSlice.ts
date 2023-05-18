import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortId: "",
  roomId: "",
  name: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    selectChat(state, action) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.shortId = action.payload.shortId;
    },
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
