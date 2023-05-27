import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

class UserService {
  async signIn(emailSignIn: string, password: string) {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailSignIn,
        password
      );
      const { displayName, photoURL, uid, email } = userCredential.user;
      return {
        name: displayName,
        photoURL,
        id: uid,
        email,
      };
    } catch (e) {
      // Manejo del error
      throw Error("Las credenciales no son correctas");
    }
  }

  async signUp(emailSignup: string, password: string) {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailSignup,
        password
      );
      const { uid, email } = userCredential.user;
      return {
        id: uid,
        email,
      };
    } catch (e) {
      // Manejo del error
      throw Error("Ya existe una cuenta con este email");
    }
  }

  async loginWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();
      await setPersistence(auth, browserSessionPersistence);
      const res = await signInWithPopup(auth, googleProvider);
      const { displayName, email, photoURL, uid } = res.user;
      return { name: displayName, email, photoURL, id: uid };
    } catch (e) {
      throw e;
    }
  }

  async updateData(updatableData: UpdatableData) {
    console.log(updatableData);

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, updatableData);
      }
      return;
    } catch (e) {
      throw e;
    }
  }
  async logOut() {
    try {
      await signOut(auth);
      return "Sesión cerrada";
    } catch (e) {
      throw e;
    }
  }
}

export const userService = new UserService();
