import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
  name: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    selectChat(state, action) {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
