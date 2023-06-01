import { auth } from "@/firebase";
import { API_BASE_URL } from "@/utils/constants";
import axios from "axios";
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
      this.syncUser(uid, displayName, photoURL);
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

  async syncUser(userId: string, name: string | null, photoURL: string | null) {
    let payload = {};
    if (name) {
      payload = { name };
    }
    if (photoURL) {
      payload = { ...payload, photoURL };
    }
    return await axios.post(API_BASE_URL + "/auth", payload, {
      params: { userId },
    });
  }

  async signUp(emailSignup: string, password: string) {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailSignup,
        password
      );
      const { uid, email, photoURL, displayName } = userCredential.user;
      this.syncUser(uid, displayName, photoURL);
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
      this.syncUser(uid, displayName, photoURL);
      return { name: displayName, email, photoURL, id: uid };
    } catch (e) {
      throw e;
    }
  }

  async updateParticipant(userId: string, name?: string, photoURL?: string) {
    let payload = {};
    if (name) {
      payload = { name };
    }
    if (photoURL) {
      payload = { ...payload, photoURL };
    }
    return await axios.put(API_BASE_URL + "/participant", payload, {
      params: { userId },
    });
  }

  async updateData(updatableData: UpdatableData) {
    try {
      if (auth.currentUser) {
        const { uid } = auth.currentUser;
        await updateProfile(auth.currentUser, updatableData);
        console.log(updatableData.photoURL, updatableData.displayName);

        this.updateParticipant(
          uid,
          updatableData.displayName,
          updatableData.photoURL
        );
        this.syncUser(
          uid,
          updatableData.displayName || null,
          updatableData.photoURL || null
        );
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
