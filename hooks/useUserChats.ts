import { db } from "@/firebase";
import { chatListFilterSelector, userSelector } from "@/redux/selectors";
import { getRoomsByName } from "@/utils/filters";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useUserChats() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useSelector(userSelector);
  const { filter } = useSelector(chatListFilterSelector);
  const [rooms, setRooms] = useState([] as any);

  useEffect(() => {
    const getChats = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(collection(db, "usersChat"), id), (doc) => {
        let data = doc.data();
        let chats = data && Object.entries(data);
        setRooms(chats);
        setIsLoading(false);
      });
      return () => {
        unsub();
      };
    };
    setRooms(getRoomsByName(filter, rooms));
    id && !filter && getChats();
  }, [id, filter]);
  return [rooms, isLoading];
}
