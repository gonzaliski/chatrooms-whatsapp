"use client";
import { db } from "@/firebase";
import { selectChat } from "@/redux/slices/chatSlice";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard } from "./ChatCard";
import { NewChat } from "./NewChat";

export const ChatCardList = () => {
  const [selected, setSelected] = useState("");
  const { id } = useSelector((state: userState) => state.user);
  const [rooms, setRooms] = useState([] as any);
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    console.log(rooms[room.roomId]);

    setSelected(room.roomId);
    dispatch(selectChat(room));
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(collection(db, "usersChat"), id), (doc) => {
        console.log("xd", doc.data());
        setRooms(doc.data());
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
      {Object.entries(rooms)?.map((room: any) => (
        <ChatCard
          key={room[0]}
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
