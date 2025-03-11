"use client";
import { useUserChats } from "@/hooks/useUserChats";
import { chatListFilterSelector, userSelector } from "@/redux/selectors";
import { selectChat } from "@/redux/slices/chatSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatCardSkeleton } from "../loaders/ChatCardSkeleton";
import { ChatCard } from "./ChatCard";
import { NewChat } from "./NewChat";

export const ChatCardList = () => {
  const { id } = useSelector(userSelector);
  const { filter } = useSelector(chatListFilterSelector);
  const { userChats, loading } = useUserChats(id, filter);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const handleSelect = (room: RoomSelection) => {
    setSelected(room.chatId);
    dispatch(selectChat(room));
  };
  if (filter)
    return (
      <div className="flex flex-col h-full w-full overflow-auto pr-1">
        <p className="text-sm w-full text-clip text-wpp-primary text-center my-4">
          RESULTADOS DE BÚSQUEDA
        </p>
        {loading ? (
          <ChatCardSkeleton />
        ) : (
          userChats.map((chat: userChat) => (
            <ChatCard
              key={chat.chatId}
              roomId={chat.chatId}
              contact={chat.contactData}
              lastMessage={chat.lastMessage}
              lastMessageFrom={chat.lastMessageFrom as string}
              timeStamp={chat.timestamp}
              onSelect={handleSelect}
              selected={selected == chat.chatId ? true : false}
              isSeen={chat.isSeen}
            />
          ))
        )}
      </div>
    );

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
        userChats.map((chat: userChat) => (
          <ChatCard
            key={chat.chatId}
            roomId={chat.chatId}
            contact={chat.contactData}
            lastMessage={chat.lastMessage}
            lastMessageFrom={chat.lastMessageFrom as string}
            timeStamp={chat.timestamp}
            onSelect={handleSelect}
            selected={selected == chat.chatId ? true : false}
            isSeen={chat.isSeen}
          />
        ))
      )}
    </div>
  );
};
