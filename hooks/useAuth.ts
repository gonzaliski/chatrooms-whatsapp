import { auth } from "@/firebase";
import { logOut, setUserData } from "@/redux/slices/userSlice";
import { parseUserCredentials } from "@/utils/parseUserCredentials";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserData(parseUserCredentials(user)));
      } else {
        dispatch(logOut());
      }
    });
    return unsubscribe;
  }, []);
};
