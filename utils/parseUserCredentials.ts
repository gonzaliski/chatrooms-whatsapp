import { User } from "firebase/auth";

export function parseUserCredentials(user: User) {
  return {
    id: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    name: user.displayName,
    loading: false,
    isNew: false,
  };
}
