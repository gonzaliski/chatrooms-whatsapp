"use client";
import { Spinner } from "@/components/loaders/Spinner";
import { useChatMessages } from "@/hooks/useChat";
import { chatService } from "@/services/chatService";
import { useEffect, useRef } from "react";
import { Message } from "./Message";

export const ConversationPanel = ({
  chatId,
  userId,
  profilePicture,
}: {
  chatId: string;
  userId: string;
  profilePicture: participantsData["profilePictures"];
}) => {
  const { messages, loading } = useChatMessages(chatId);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messages.length > 0) {
      console.log("Marcado como visto");
      chatService.markMessagesAsSeen(userId, chatId); // 📌 Marcar como vistos al recibir mensajes
    }

    messages && messagesEndRef.current?.scrollTo({ behavior: "auto" });
  }, [messages, userId, chatId]);
  return (
    <div className="h-full w-full relative overflow-auto bg-conversation-panel">
      <div className="h-full w-full bg-wpp_chat bg-repeat opacity-5 absolute object-cover -z-9"></div>

      <div className="flex flex-col relative z-10 h-full w-full overflow-auto">
        {loading && (
          <div className="self-center">
            <Spinner />
          </div>
        )}
        <div className="w-full my-8" />
        {!loading &&
          messages?.map((m: ChatMessage, idx: any) => {
            let prevMessage = idx > 0 ? messages[idx - 1] : null;
            let nextMessage = messages[idx + 1];
            let shouldHaveNoCorner = prevMessage
              ? prevMessage.idFrom !== m.idFrom
              : true;
            return (
              <Message
                id={m.messageId}
                key={m.messageId}
                incoming={m.idFrom !== userId}
                messageText={m.message.text || ""}
                messageImg={m.message.img || ""}
                timeStamp={m.timestamp}
                prevIsFromOther={shouldHaveNoCorner}
                isLast={
                  nextMessage == undefined || nextMessage.idFrom !== m.idFrom
                }
                profilePicture={profilePicture}
                from={m.idFrom}
              />
            );
          })}
        {messages && <div ref={messagesEndRef} />}
      </div>
    </div>
  );
};
