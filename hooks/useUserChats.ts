import { db } from "@/firebase";
import { userSelector } from "@/redux/selectors";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useUserChats() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useSelector(userSelector);
  const [rooms, setRooms] = useState([] as any);

  useEffect(() => {
    const getChats = () => {
      setIsLoading(true);
      const unsub = onSnapshot(doc(collection(db, "usersChat"), id), (doc) => {
        let data = doc.data();
        let chats = data && Object.entries(data);
        console.log(chats);
        setRooms(chats);
        setIsLoading(false);
      });
      return () => {
        unsub();
      };
    };

    id && getChats();
  }, [id]);
  return [rooms, isLoading];
}
