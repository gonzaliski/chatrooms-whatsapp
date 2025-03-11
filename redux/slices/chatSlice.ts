import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortId: "",
  roomId: "",
  name: "",
  participants: [],
} as RoomSelection;

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    selectChat(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset: () => initialState,
  },
});

export const { selectChat, reset } = chatSlice.actions;
export default chatSlice.reducer;
