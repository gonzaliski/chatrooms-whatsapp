"use client";
import { userSelector } from "@/redux/selectors";
import Image from "next/image";
import { MdPhotoCamera } from "react-icons/md";
import { useSelector } from "react-redux";
import defaultGroup from "../../public/defaultGroups.jpg";
export const ChatCard = ({
  roomId,
  shortId,
  name,
  lastMessage,
  timeStamp,
  selected,
  onSelect,
}: ChatCardProps) => {
  const { id } = useSelector(userSelector);
  let timeStampDate = timeStamp?.toDate();
  let messageFrom =
    lastMessage?.id !== undefined
      ? lastMessage.id == id
        ? "Tú: "
        : lastMessage?.from + ": "
      : "";
  return (
    <div
      className={`flex text-white justify-start max-w-md min-h-[72px] relative cursor-pointer hover:bg-wpp-darkblue
       ${selected ? "bg-wpp-darkblue pointer-events-none" : ""}`}
      onClick={() => onSelect({ shortId, roomId: roomId, name })}
    >
      <div className="px-[15px]">
        <Image
          src={defaultGroup}
          className="inline object-cover w-[49px] h-[49px] rounded-full max-w-none mt-2"
          width="100"
          height="100"
          alt="Profile image"
        />
      </div>
      <div className="flex flex-col flex-grow font-light justify-center pr-5 truncate border-t border-gray-400/10">
        <span className="text-lg">{name}</span>
        <span className="flex gap-2 text-sm text-gray-400 truncate min-h-[15px] min-w-full">
          {messageFrom}
          {lastMessage?.img ? (
            <div className="flex gap-1 items-center">
              <MdPhotoCamera /> Imagen
            </div>
          ) : (
            lastMessage?.text
          )}
        </span>
      </div>
      <span className="text-xs text-gray-400 absolute top-4 right-5">
        {timeStampDate &&
          timeStampDate.getHours() +
            ":" +
            ((timeStampDate.getMinutes() < 10 ? "0" : "") +
              timeStampDate.getMinutes())}
      </span>
    </div>
  );
};
