import { auth } from "@/firebase";
import { parseUserCredentials } from "@/utils/parseUserCredentials";
import { createSlice } from "@reduxjs/toolkit";

console.log(auth.currentUser);

const parsedUser = auth.currentUser
  ? parseUserCredentials(auth.currentUser)
  : null;

const emptyState = {
  email: "",
  photoURL: "",
  id: "",
  name: "",
  loading: false,
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
        ...action.payload,
      };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logOut: () => emptyState,
  },
});

export const { setUserData, logOut } = userSlice.actions;
export default userSlice.reducer;
