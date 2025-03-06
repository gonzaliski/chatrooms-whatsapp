import { auth } from "@/firebase";
import { db } from "../firebase";
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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
  async ensureUserExists(
    uid: string,
    name: string | null,
    photoURL: string | null,
    email: string | null
  ) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const defaultUsername = email?.split("@")[0];
        await setDoc(userRef, {
          id: uid,
          name: name || "Usuario",
          photoURL: photoURL || "",
          username: defaultUsername,
          createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error al registrar el usuario en Firestore:", error);
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
      const { uid, email, photoURL, displayName } = userCredential.user;
      await this.ensureUserExists(uid, displayName, photoURL, emailSignup);
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
      await this.ensureUserExists(uid, displayName, photoURL, email);
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
  // Función para buscar usuarios por nombre
  async searchUsers(searchQuery: string): Promise<any> {
    try {
      // Accede a la colección "users"
      const usersRef = collection(db, "users");

      // Crea la consulta
      const usersQuery = query(
        usersRef,
        where("username", ">=", searchQuery), // Busca usuarios cuyo nombre comience con el searchQuery
        where("username", "<=", searchQuery + "\uf8ff") // Realiza un rango de búsqueda
      );

      const querySnapshot = await getDocs(usersQuery); // Obtiene los documentos que coinciden con la consulta

      const users: { id: string }[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() }); // Extrae la data y agrega el id
      });
      return users;
    } catch (error) {
      console.error("Error al buscar usuarios: ", error);
      return [];
    }
  }
}

export const userService = new UserService();
