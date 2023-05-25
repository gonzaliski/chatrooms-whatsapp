import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  pendingToSend: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    setImage(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    unselectImage(state) {
      if (state.file) URL.revokeObjectURL(state.file);
      return initialState;
    },
    sendImage(state, action) {
      state.pendingToSend = action.payload;
    },
  },
});

export const { setImage, unselectImage, sendImage } = imageSlice.actions;
export default imageSlice.reducer;
