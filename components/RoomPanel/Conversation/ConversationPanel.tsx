"use client";
import { useChat } from "@/hooks/useChat";
import { Message } from "./Message";
import { useEffect, useRef } from "react";

export const ConversationPanel = ({ id }: { id: string }) => {
  const [messages, shortId] = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messages && messagesEndRef.current?.scrollTo({ behavior: "auto" });
  }, []);
  return (
    <div className="h-full w-full relative overflow-auto bg-conversation-panel">
      <div className="h-full w-full bg-wpp_chat bg-repeat opacity-5 absolute object-cover -z-9"></div>{" "}
      <div className="flex flex-col relative z-10 h-full w-full overflow-auto">
        <div className="w-full my-8" />
        {messages ? (
          messages?.map((m: any, idx: any) => {
            let prevMessage = idx > 0 ? messages[idx - 1] : null;
            let nextMessage = messages[idx + 1];
            let shouldHaveNoCorner = prevMessage
              ? prevMessage[1].id !== m[1].id
              : true;
            return (
              <Message
                key={m[0]}
                incoming={m[1].id !== id}
                message={m[1].message}
                from={m[1].name}
                timeStamp={m[1].timeStamp}
                prevIsFromOther={shouldHaveNoCorner}
                isLast={
                  nextMessage == undefined || nextMessage[1].id !== m[1].id
                }
              />
            );
          })
        ) : (
          <h2 className="text-white text-center font-thin text-xl sm:text-2xl md:text-3xl">
            Compartí el código <b>{shortId}</b> para empezar a chatear
          </h2>
        )}
        {messages && <div ref={messagesEndRef} />}
      </div>
    </div>
  );
};
