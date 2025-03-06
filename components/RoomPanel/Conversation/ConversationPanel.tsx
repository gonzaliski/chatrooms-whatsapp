"use client";
import { useChat } from "@/hooks/useChat";
import { Message } from "./Message";
import { useEffect, useRef } from "react";
import { getMessageSource, getProfilePicture } from "@/utils/filters";

export const ConversationPanel = ({
  userId,
  profilePictures,
  participants,
}: {
  userId: string;
  profilePictures: participantsData["profilePictures"];
  participants: participantsData["participants"];
}) => {
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
                id={m.id}
                key={m.id}
                incoming={m[1].id !== userId}
                message={m[1].message}
                from={participants && getMessageSource(m[1].id, participants)}
                timeStamp={m[1].timeStamp}
                prevIsFromOther={shouldHaveNoCorner}
                isLast={
                  nextMessage == undefined || nextMessage[1].id !== m[1].id
                }
                profilePicture={
                  profilePictures && getProfilePicture(m[1].id, profilePictures)
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
