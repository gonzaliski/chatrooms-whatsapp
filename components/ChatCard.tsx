"use client";
import Image from "next/image";
export const ChatCard = ({
  id,
  shortId,
  name,
  lastMessage,
  timeStamp,
  selected,
  onSelect,
}: ChatCardProps) => {
  let timeStampDate = timeStamp.toDate();
  return (
    <div
      className={`flex text-white justify-start max-w-md min-h-[72px] relative cursor-pointer hover:bg-wpp-darkblue
       ${selected ? "bg-wpp-darkblue" : ""}`}
      onClick={() => onSelect({ shortId, roomId: id, name })}
    >
      <div className="px-[15px]">
        <Image
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          className="inline object-cover w-[49px] h-[49px] rounded-full max-w-none mt-2"
          width="100"
          height="100"
          alt="Profile image"
        />
      </div>
      <div className="flex flex-col flex-grow font-light justify-center pr-5 truncate border-t border-gray-400/10">
        <span className="text-lg">{name}</span>
        <span className="text-sm text-gray-400 truncate min-h-[15px] min-w-full">
          {lastMessage}
        </span>
      </div>
      <span className="text-xs text-gray-400 absolute top-4 right-5">
        {timeStampDate.getHours() +
          ":" +
          ((timeStampDate.getMinutes() < 10 ? "0" : "") +
            timeStampDate.getMinutes())}
      </span>
    </div>
  );
};
