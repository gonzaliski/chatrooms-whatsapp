import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useRef } from "react";
import defaultUser from "../../../public/deafultUserPhoto.jpg";

export const Message = ({
  incoming,
  message,
  from,
  timeStamp,
  prevIsFromOther,
  isLast,
  profilePicture,
}: Message) => {
  let color = incoming ? "bg-incoming-bg" : "bg-outgoing-bg";
  let messageCornerProps = incoming
    ? "-rotate-45 transform origin-top-left"
    : "rotate-45 transform origin-top-right";
  let messageCornerPosition = incoming ? "top-0 -left-3" : "top-0 -right-3";
  let shouldShowFullScheme = prevIsFromOther
    ? incoming
      ? `rounded-tl-none`
      : `rounded-tr-none`
    : null;
  const timestamp = new Timestamp(timeStamp._seconds, timeStamp._nanoseconds);
  let timeStampDate = timestamp.toDate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    !incoming && ref.current?.scrollIntoView({ behavior: "auto" });
  }, [incoming]);
  return (
    <div
      className={`relative flex flex-col ${
        incoming ? "items-start" : "items-end"
      } w-full px-16 ${isLast ? "mb-4" : "mb-0.5"}`}
    >
      {shouldShowFullScheme && incoming && (
        <Image
          src={profilePicture || defaultUser}
          className="absolute left-6 object-cover w-[25px] h-[25px] rounded-full max-w-none cursor-pointer"
          width="100"
          height="100"
          alt="Profile image"
        />
      )}
      <div
        ref={ref}
        className={`max-w-[65%] break-words ${color} text-white px-[9px] pr-[50px] pt-[6px] pb-[8px] rounded-lg ${shouldShowFullScheme} relative shadow-black shadow-sm text-sm font-light`}
      >
        {incoming && prevIsFromOther && (
          <h5 className="pl-1 pb-1 text-sm font-thin text-white">{from}</h5>
        )}
        {message.img && (
          <Image
            src={message.img}
            alt={"image"}
            className="object cover w-[200px] mb-3"
            width={100}
            height={100}
          />
        )}
        <p>{message.text}</p>
        {prevIsFromOther && (
          <div
            className={`w-3 overflow-hidden inline-block absolute ${messageCornerPosition} -z-10`}
          >
            <div className={` h-5 ${color} ${messageCornerProps}`}></div>
          </div>
        )}
        <div className="text-[11px] font-thin absolute bottom-0.5 right-3 rounded-tl">
          <span>
            {timeStampDate.getHours() +
              ":" +
              ((timeStampDate.getMinutes() < 10 ? "0" : "") +
                timeStampDate.getMinutes())}
          </span>
        </div>
      </div>
    </div>
  );
};
