import { chatService } from "@/services/chatService";
import { useEffect, useState } from "react";

export const useChatMessages = (chatId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = chatService.listenMessages(chatId, (chatData) => {
      if (chatData.messages.length > 0) {
        setMessages(chatData.messages);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Limpia la suscripción cuando el componente se desmonta
  }, [chatId]);

  return { messages, loading };
};
