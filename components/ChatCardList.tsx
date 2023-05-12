"use client";
import { db } from "@/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCard } from "./ChatCard";
import { MdAdd } from "react-icons/md";
import { selectChat } from "@/redux/slices/chatSlice";

interface userState {
  user: UserState;
}

export const ChatCardList = () => {
  const { id } = useSelector((state: userState) => state.user);
  const [rooms, setRooms] = useState([] as any);
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    console.log(room);

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
      <button className="group flex justify-center w-full border-none bg-transparent hover:bg-wpp-green.300 text-white text-2xl p-1">
        <MdAdd />
        <span className="hidden animate-pulse group-hover:inline text-white text-center self-center text-sm">
          Crear una nueva sala
        </span>
      </button>
      {Object.entries(rooms)?.map((room: any) => (
        <ChatCard
          key={room[0]}
          id={room[0]}
          name={room[1].roomName}
          lastMessage={room[1].lastMessage}
          timeStamp={room[1].timeStamp}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
