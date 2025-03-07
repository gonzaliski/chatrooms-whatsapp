import { db } from "@/firebase";
import { chatService } from "@/services/chatService";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUserChats = (userId: string) => {
  const [userChats, setUserChats] = useState<userChat[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", userId), async (res) => {
      const items = res.data()!!.chats;
      console.log(items);
      if (items) {
        const promises = items.map(async (item: any) => {
          const userDocRef = doc(db, "users", item.contactData.id);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setUserChats(chatData.sort((a, b) => b.timestamp - a.timestamp));
        setLoading(false);
      } else {
        setUserChats([]);
        setLoading(false);
      }
    });

    return () => {
      unSub();
    };
  }, [userId]);
  return { userChats, loading };
};
