"use client";
import { userSelector } from "@/redux/selectors";
import Image from "next/image";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdPhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";

export const ChatCard = ({
  roomId,
  contact,
  lastMessage,
  lastMessageFrom,
  timeStamp,
  selected,
  isSeen,
  onSelect,
}: ChatCardProps) => {
  const { id } = useSelector(userSelector);
  let timeStampDate = new Date(timeStamp);
  const hasNewMessages = !isSeen;
  console.log(hasNewMessages);

  let messageFrom = lastMessageFrom == id ? <IoCheckmarkDoneOutline /> : "";
  return (
    <div
      className={`flex text-white justify-start max-w-md min-h-[72px] relative cursor-pointer hover:bg-wpp-darkblue
       ${selected ? "bg-wpp-darkblue pointer-events-none" : ""}`}
      onClick={() => onSelect({ chatId: roomId, contactData: contact })}
    >
      <div className="px-[15px]">
        <Image
          src={contact.photoURL}
          className="inline object-cover w-[49px] h-[49px] rounded-full max-w-none mt-2"
          width="100"
          height="100"
          alt="Profile image"
        />
      </div>
      <div className="flex flex-col flex-grow font-light justify-center pr-5 truncate border-t border-gray-400/10">
        <span className={`text-md ${hasNewMessages && "text-green-500"}`}>
          {contact.name}
        </span>
        <span className="flex gap-2 text-sm text-gray-400 truncate min-h-[15px] min-w-full">
          {messageFrom}
          {lastMessage.img && !lastMessage.text ? (
            <div className="flex gap-1 items-center">
              <MdPhotoCamera /> Imagen
            </div>
          ) : (
            <div className="flex gap-1 items-center text-ellipsis">
              {lastMessage.text}
            </div>
          )}
        </span>
      </div>
      <span
        className={`text-xs text-gray-400 absolute top-4 right-5 ${
          hasNewMessages && "text-green-500"
        }`}
      >
        {timeStampDate &&
          timeStampDate.getHours() +
            ":" +
            ((timeStampDate.getMinutes() < 10 ? "0" : "") +
              timeStampDate.getMinutes())}
      </span>
    </div>
  );
};
