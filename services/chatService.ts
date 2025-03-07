import { push, ref, set } from "firebase/database";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, rtdb } from "../firebase";
class ChatService {
  // 🟢 Función para crear o encontrar una sala de chat entre usuarios
  async getOrCreateChatRoom(
    thisUserId: string,
    receiver: UserData
  ): Promise<any> {
    const roomId = [thisUserId, receiver.id].sort().join("_"); // Genera un ID único basado en los usuarios
    const timestamp = new Date().toISOString();
    try {
      const roomRef = doc(db, "chats", roomId);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        // 🟢 Crea la sala si no existe
        await setDoc(roomRef, { createdAt: timestamp });

        // 🟢 Agrega el chat a la lista de chats del usuario
        const userChatRef = doc(db, "userchats", thisUserId);
        await setDoc(
          userChatRef,
          {
            chats: arrayUnion({
              chatId: roomId,
              lastMessage: "",
              contactData: {
                id: receiver.id,
                photoURL: receiver.photoURL,
                name: receiver.name,
              },
              timestamp,
            }),
          },
          { merge: true } // 🔥 Asegura que el documento se cree si no existe
        );
        return roomId;
      }
    } catch (e) {
      console.log(e);
    }
  }

  // 🟢 Función para enviar mensajes dentro de una sala
  async sendMessage(
    chatId: string,
    userId: string,
    receiverId: string,
    message: { text?: string; img?: string } | string
  ): Promise<void> {
    try {
      const currentTime = serverTimestamp();
      await updateDoc(doc(db, "chats", chatId), {
        idFrom: userId,
        message,
        timestamp: currentTime,
      });
      //Actualizar chatlist de ambos
      [userId, receiverId].forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c: userChat) => c.chatId === chatId
          );
          userChatsData[chatIndex].lastMessage = message;
          userChatsData[chatIndex].isSeen = id === receiverId ? true : false;
          userChatsData[chatIndex].timestamp = currentTime;
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });

      // Actualizar último mensaje en la sala
      // const chatRef = ref(rtdb, `chats/${roomId}/info`);
      // await update(chatRef, {
      //   from: userId,
      //   lastMessage: message,
      //   lastTimestamp: Date.now(),
      // });
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  }
  listenUserChats(userId: string, callback: (data: any) => void) {
    return onSnapshot(doc(db, "userchats", userId), (docSnap) => {
      if (docSnap.exists()) {
        console.log(docSnap.data());

        callback(docSnap.data() || []); // Devuelve los datos actualizados
      } else {
        console.log("No se encontraron chats para el usuario.");
      }
    });
  }
}

export const chatService = new ChatService();
