import { rtdb } from "@/firebase";
import { chatSelector } from "@/redux/selectors";
import { onValue, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function useChat() {
  const [messages, setMessages] = useState([] as any);
  const { shortId, roomId } = useSelector(chatSelector);

  useEffect(() => {
    const listenChat = onValue(
      ref(rtdb, "/rooms/" + roomId),
      (snapshot) => {
        let currentMessages =
          snapshot.val() && Object.entries(snapshot.val()?.messages);
        setTimeout(() => {
          setMessages(currentMessages);
        }, 400);
      },
      (e) => console.error(e)
    );
    return () => {
      // Detiene la escucha de cambios
      listenChat();
    };
  }, [roomId]);
  return [messages, shortId];
}
