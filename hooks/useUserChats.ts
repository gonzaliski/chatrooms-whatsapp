import { chatService } from "@/services/chatService";
import { useEffect, useState } from "react";

export const useUserChats = (userId: string) => {
  const [userChats, setUserChats] = useState<userChat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const unSub = chatService.listenUserChats(userId, (chats) => {
      setUserChats(chats);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [userId]);

  return { userChats, loading };
};
