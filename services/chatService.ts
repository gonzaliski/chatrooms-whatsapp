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
import { uid } from "uid";
class ChatService {
  // 🟢 Función para crear o encontrar una sala de chat entre usuarios
  async getOrCreateChatRoom(
    thisUser: UserData,
    receiver: UserData
  ): Promise<any> {
    const chatId = [thisUser.id, receiver.id].sort().join("_"); // Genera un ID único basado en los usuarios
    const timestamp = new Date().toISOString();
    try {
      const roomRef = doc(db, "chats", chatId);
      const roomSnap = await getDoc(roomRef);

      if (!roomSnap.exists()) {
        // 🟢 Crea la sala si no existe
        await setDoc(roomRef, { createdAt: timestamp });

        // 🟢 Agrega el chat a la lista de chats del usuario
        await setDoc(
          doc(db, "userchats", thisUser.id),
          {
            chats: arrayUnion({
              chatId: chatId,
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
        await setDoc(
          doc(db, "userchats", receiver.id),
          {
            chats: arrayUnion({
              chatId: chatId,
              lastMessage: "",
              contactData: {
                id: thisUser.id,
                photoURL: thisUser.photoURL,
                name: thisUser.name,
              },
              timestamp,
            }),
          },
          { merge: true } // 🔥 Asegura que el documento se cree si no existe
        );
        return chatId;
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
    message: { text?: string; img?: string }
  ): Promise<void> {
    try {
      const currentTime = new Date().toISOString();
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          idFrom: userId,
          message,
          timestamp: currentTime,
          messageId: uid(),
        }),
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
          userChatsData.chats[chatIndex].lastMessage = message;
          userChatsData.chats[chatIndex].isSeen = id === userId ? true : false;
          userChatsData.chats[chatIndex].timestamp = currentTime;
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
  listenMessages(chatId: string, callback: (chats: any) => void) {
    return onSnapshot(doc(db, "chats", chatId), async (res) => {
      callback(res.data());
    });
  }
  listenUserChats(userId: string, callback: (chats: userChat[]) => void) {
    return onSnapshot(doc(db, "userchats", userId), async (res) => {
      const items = res.data()?.chats;
      if (!items) {
        callback([]);
        return;
      }

      // Obtener los datos del usuario asociado a cada chat
      const chatData = await Promise.all(
        items.map(async (item: any) => {
          const userDocRef = doc(db, "users", item.contactData.id);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        })
      );

      callback(chatData.sort((a, b) => b.timestamp - a.timestamp));
    });
  }
  async markMessagesAsSeen(userId: string, chatId: string) {
    try {
      const userChatRef = doc(db, "userchats", userId);
      const userChatSnap = await getDoc(userChatRef);

      if (!userChatSnap.exists()) return;

      const userChats = userChatSnap.data().chats || [];

      // Modificar solo el chat específico
      const updatedChats = userChats.map((chat: any) =>
        chat.chatId === chatId ? { ...chat, isSeen: true } : chat
      );
      // Guardar los cambios en Firestore
      await updateDoc(userChatRef, { chats: updatedChats });
    } catch (error) {
      console.error("Error marcando mensajes como vistos:", error);
    }
  }
}

export const chatService = new ChatService();
