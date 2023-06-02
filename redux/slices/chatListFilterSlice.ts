import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const chatListFilterSlice = createSlice({
  name: "chatListFilter",
  initialState: initialState,
  reducers: {
    clearFilters() {
      return initialState;
    },
    setFilters(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { clearFilters, setFilters } = chatListFilterSlice.actions;
export default chatListFilterSlice.reducer;
