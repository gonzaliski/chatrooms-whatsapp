import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  token: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    token: "",
  },
  reducers: {
    addUserEmail(state, action) {
      state.email = action.payload.email;
    },
    addUserToken(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const { addUserEmail, addUserToken } = userSlice.actions;
export default userSlice.reducer;
