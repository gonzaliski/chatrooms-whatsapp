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
    addUserData(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
    },
    logOut: () => initialState,
  },
});

export const { addUserEmail, addUserData, logOut } = userSlice.actions;
export default userSlice.reducer;
