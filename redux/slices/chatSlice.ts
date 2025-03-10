import { createSlice } from "@reduxjs/toolkit";

const initialState: RoomSelection = {
  chatId: "",
  contactData: {
    id: "",
    name: "",
    photoURL: "",
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    selectChat(state, action) {
      console.log(state, action.payload);

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
