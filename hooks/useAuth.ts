import { auth } from "@/firebase";
import { logOut, setUserData } from "@/redux/slices/userSlice";
import { parseUserCredentials } from "@/utils/parseUserCredentials";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserData(parseUserCredentials(user)));
        setIsAuth(true);
      } else {
        dispatch(logOut());
      }
    });
    return unsubscribe;
  }, []);
  return isAuth;
};
