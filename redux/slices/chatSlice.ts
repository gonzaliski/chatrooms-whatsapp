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
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
