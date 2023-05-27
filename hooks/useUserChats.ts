import { db } from "@/firebase";
import { userSelector } from "@/redux/selectors";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useUserChats() {
  const { id } = useSelector(userSelector);
  const [rooms, setRooms] = useState([] as any);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(collection(db, "usersChat"), id), (doc) => {
        let data = doc.data();
        let chats = data && Object.entries(data);
        console.log(chats);
        setRooms(chats);
      });
      return () => {
        unsub();
      };
    };

    id && getChats();
  }, [id]);
  return rooms;
}
