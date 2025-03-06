import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
class ChatService {
  // 🟢 Función para crear o encontrar una sala de chat entre usuarios
  async getOrCreateChatRoom(userA: string, userB: string): Promise<string> {
    const roomId = [userA, userB].sort().join("_"); // Genera un ID único basado en los usuarios

    const roomRef = doc(db, "chats", roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      await setDoc(roomRef, { users: [userA, userB] }); // Crea la sala si no existe
    }

    return roomId;
  }
  // 🟢 Función para enviar mensajes dentro de una sala
  async sendMessage(
    roomId: string,
    user: string,
    message: string
  ): Promise<void> {
    try {
      const messagesRef = collection(db, "messages", roomId, "chatMessages");
      await addDoc(messagesRef, {
        user,
        message,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  }
  // 🟢 Función para escuchar mensajes de una sala en tiempo real
  static listenMessages = (
    roomId: string,
    callback: (messages: Message[]) => void
  ): (() => void) => {
    const messagesRef = collection(db, "messages", roomId, "chatMessages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        const message: Message = {
          id: doc.id, // Asignando el ID del mensaje
          from: data.user || "", // Asegúrate de que estos campos existan o asigna valores por defecto
          message: data.message || "",
          timeStamp: data.timestamp || serverTimestamp(),
          prevIsFromOther: false,
        };
        return message;
      });
      callback(messages);
    });
  };
}

export const chatService = new ChatService();
