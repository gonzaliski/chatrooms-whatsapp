"use client";
import { useUserChats } from "@/hooks/useUserChats";
import { selectChat } from "@/redux/slices/chatSlice";
import { Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { ChatCardSkeleton } from "../loaders/ChatCardSkeleton";
import { ChatCard } from "./ChatCard";
import { NewChat } from "./NewChat";

export const ChatCardList = () => {
  const [selected, setSelected] = useState("");
  const rooms = useUserChats();
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    setSelected(room.roomId);
    dispatch(selectChat(room));
  };
  return (
    <div className="flex flex-col h-full w-full overflow-auto pr-1">
      <NewChat />
      <Suspense fallback={<ChatCardSkeleton />}>
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
      </Suspense>
    </div>
  );
};
