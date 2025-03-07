"use client";
import { chatListFilterSelector, userSelector } from "@/redux/selectors";
import { selectChat } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewChat } from "./NewChat";
import { useUserChats } from "@/hooks/useUserChats";
import { ChatCardSkeleton } from "../loaders/ChatCardSkeleton";
import { ChatCard } from "./ChatCard";

export const ChatCardList = () => {
  const { id } = useSelector(userSelector);
  const { userChats, loading } = useUserChats(id);
  const [selected, setSelected] = useState("");
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
      {loading ? (
        <ChatCardSkeleton />
      ) : (
        userChats
          .sort((a: any, b: any) => b.timestamp - a.timestamp)
          .map((chat: userChat) => (
            <ChatCard
              key={chat.chatId}
              roomId={chat.chatId}
              contact={chat.contactData}
              lastMessage={chat.lastMessage}
              lastMessageFrom={chat.lastMessageFrom}
              timeStamp={chat.timestamp}
              onSelect={handleSelect}
              selected={selected == chat.chatId ? true : false}
              shortId={""}
            />
          ))
      )}
    </div>
  );
};
