import { User } from "firebase/auth";

export function parseUserCredentials(user: User) {
  return {
    id: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    name: user.displayName,
    loading: true,
    isAuth: true,
    isNew: false,
  };
}
