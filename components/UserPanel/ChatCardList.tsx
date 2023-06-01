"use client";
import { useUserChats } from "@/hooks/useUserChats";
import { selectChat } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCardSkeleton } from "../loaders/ChatCardSkeleton";
import { ChatCard } from "./ChatCard";
import { NewChat } from "./NewChat";
import { chatListFilterSelector } from "@/redux/selectors";

export const ChatCardList = () => {
  const [selected, setSelected] = useState("");
  const [rooms, isLoading] = useUserChats();
  const { filter } = useSelector(chatListFilterSelector);
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    setSelected(room.roomId);
    dispatch(selectChat(room));
  };
  return (
    <div className="flex flex-col h-full w-full overflow-auto pr-1">
      <NewChat />
      {filter && (
        <p className="text-sm w-full text-clip text-wpp-primary text-center my-4">
          RESULTADOS DE BÚSQUEDA
        </p>
      )}
      {isLoading ? (
        <ChatCardSkeleton />
      ) : (
        rooms?.length > 0 &&
        rooms
          ?.sort((a: Room, b: Room) => b[1].timeStamp - a[1].timeStamp)
          .map((room: Room) => (
            <ChatCard
              key={room[0]}
              participants={room[1].participants}
              shortId={room[1].roomShortId}
              roomId={room[0]}
              name={room[1].roomName}
              lastMessage={room[1].lastMessage}
              timeStamp={room[1].timeStamp}
              onSelect={handleSelect}
              selected={selected == room[0] ? true : false}
            />
          ))
      )}
    </div>
  );
};
