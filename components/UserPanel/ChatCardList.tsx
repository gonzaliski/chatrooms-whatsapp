"use client";
import { db } from "@/firebase";
import { selectChat } from "@/redux/slices/chatSlice";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChatCard } from "./ChatCard";
import { NewChat } from "./NewChat";

export const ChatCardList = ({ id }: { id: string }) => {
  const [selected, setSelected] = useState("");
  const [rooms, setRooms] = useState([] as any);
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    setSelected(room.roomId);
    dispatch(selectChat(room));
  };

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
  return (
    <div className="flex flex-col h-full w-full overflow-auto pr-1">
      <NewChat />
      {rooms?.length > 0 &&
        rooms
          ?.sort((a: Room, b: Room) => b[1].timeStamp - a[1].timeStamp)
          .map((room: Room) => (
            <ChatCard
              key={room[0]}
              participants={room[1].participants}
              shortId={room[1].roomShortId}
              id={room[0]}
              name={room[1].roomName}
              lastMessage={room[1].lastMessage}
              timeStamp={room[1].timeStamp}
              onSelect={handleSelect}
              selected={selected == room[0] ? true : false}
            />
          ))}
    </div>
  );
};
