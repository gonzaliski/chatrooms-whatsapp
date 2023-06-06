import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  photoURL: "",
  id: "",
  name: "",
  loading: true,
  isAuth: null,
  isNew: null,
};

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
    logOut: () => initialState,
  },
});

export const { setUserData, logOut } = userSlice.actions;
export default userSlice.reducer;
