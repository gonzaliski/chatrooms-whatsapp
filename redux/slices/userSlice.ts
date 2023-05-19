import { createSlice } from "@reduxjs/toolkit";
import { userService } from "@/services/userService";

const initialState = userService.getUserCredentialsFromLS() || {
  email: "",
  token: "",
  id: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    addUserEmail(state, action) {
      state.email = action.payload.email;
    },
    addUserToken(state, action) {
      state.token = action.payload.token;
    },
    addUserId(state, action) {
      state.id = action.payload.id;
    },
    logOut: () => initialState,
  },
});

export const { addUserEmail, addUserToken, addUserId, logOut } =
  userSlice.actions;
export default userSlice.reducer;
