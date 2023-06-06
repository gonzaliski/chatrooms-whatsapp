import { auth } from "@/firebase";
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
    let token = (await auth.currentUser?.getIdToken()) || "";

    return await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/auth",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      }
    );
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
    let token = (await auth.currentUser?.getIdToken()) || "";
    let payload = {};
    if (name) {
      payload = { name };
    }
    if (photoURL) {
      payload = { ...payload, photoURL };
    }
    return await axios.put(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/participant",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId },
      }
    );
  }

  async updateData(updatableData: UpdatableData) {
    try {
      if (auth.currentUser) {
        const { uid } = auth.currentUser;
        await updateProfile(auth.currentUser, updatableData);
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
