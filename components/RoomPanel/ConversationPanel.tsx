"use client";
import { rtdb } from "@/firebase";
import { onValue, ref } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export const ConversationPanel = ({
  shortId,
  roomId,
  id,
}: {
  shortId: string;
  roomId: string;
  id: string;
}) => {
  const [messages, setMessages] = useState([] as any);

  useEffect(() => {
    const listenChat = onValue(ref(rtdb, "/rooms/" + roomId), (snapshot) => {
      console.log("messages", snapshot.val());
      let currentMessages =
        snapshot.val() && Object.entries(snapshot.val()?.messages);
      setMessages(currentMessages);
    });
    return () => {
      // Detiene la escucha de cambios
      listenChat();
    };
  }, [roomId]);
  return (
    <div className="h-full w-full relative overflow-auto bg-conversation-panel">
      <div className="h-full w-full bg-wpp_chat bg-repeat opacity-5 absolute object-cover -z-9"></div>{" "}
      <div className="flex flex-col relative z-10 h-full w-full overflow-auto">
        <span className="w-full h-14" />
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
            {" "}
            Compartí el código <b>{shortId}</b> para empezar a chatear
          </h2>
        )}
      </div>
    </div>
  );
};

const Message = ({
  incoming,
  message,
  from,
  timeStamp,
  prevIsFromOther,
  isLast,
}: Message) => {
  let color = incoming ? "bg-incoming-bg" : "bg-outgoing-bg";
  let messageCornerProps = incoming
    ? "-rotate-45 transform origin-top-left"
    : "rotate-45 transform origin-top-right";
  let messageCornerPosition = incoming ? "top-0 -left-3" : "top-0 -right-3";
  let roundedBorderCorner = prevIsFromOther
    ? incoming
      ? `rounded-tl-none`
      : `rounded-tr-none`
    : null;
  const timestamp = new Timestamp(timeStamp._seconds, timeStamp._nanoseconds);
  let timeStampDate = timestamp.toDate();
  return (
    <div
      className={`flex flex-col ${
        incoming ? "items-start" : "items-end"
      } w-full px-16 ${isLast ? "mb-4" : "mb-0.5"}`}
    >
      <div
        className={`max-w-[65%] ${color} text-white px-[9px] pr-[40px] pt-[6px] pb-[8px] rounded-lg ${roundedBorderCorner} relative shadow-black shadow-sm text-sm font-light`}
      >
        {incoming && prevIsFromOther && (
          <h5 className="pl-1 pb-1 text-sm font-thin text-white">{from}</h5>
        )}
        <span>{message}</span>
        {prevIsFromOther && (
          <div
            className={`w-3 overflow-hidden inline-block absolute ${messageCornerPosition} -z-10`}
          >
            <div className={` h-5 ${color} ${messageCornerProps}`}></div>
          </div>
        )}
        <div className="text-[11px] font-thin absolute bottom-0.5 right-3 rounded-tl">
          <span>
            {timeStampDate.getHours() + ":" + timeStampDate.getMinutes()}
          </span>
        </div>
      </div>
    </div>
  );
};
