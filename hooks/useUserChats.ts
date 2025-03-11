import { chatService } from "@/services/chatService";
import { getRoomsByName } from "@/utils/filters";
import { useEffect, useState } from "react";

export const useUserChats = (userId: string, filter: string) => {
  const [userChats, setUserChats] = useState<userChat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const unSub = chatService.listenUserChats(userId, (chats) => {
      setUserChats(getRoomsByName(filter, chats));
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [userId, filter]);

  return { userChats, loading };
};
