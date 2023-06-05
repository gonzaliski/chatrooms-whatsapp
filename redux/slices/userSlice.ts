import { auth } from "@/firebase";
import { parseUserCredentials } from "@/utils/parseUserCredentials";
import { createSlice } from "@reduxjs/toolkit";

const storagedUser = auth.currentUser
  ? parseUserCredentials(auth.currentUser)
  : null;
const parsedUser =
  storagedUser !== null ? { ...storagedUser, isAuth: true } : null;
const emptyState = {
  email: "",
  photoURL: "",
  id: "",
  name: "",
  loading: true,
  isAuth: false,
  isNew: true,
};
const initialState = parsedUser || emptyState;

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUserData(state, action) {
      return {
        ...state,
        loading: false,
        isAuth: true,
        ...action.payload,
      };
    },
    logOut: () => emptyState,
  },
});

export const { setUserData, logOut } = userSlice.actions;
export default userSlice.reducer;
