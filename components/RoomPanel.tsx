"use client";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineSearch } from "react-icons/md";
import { ConversationFooter } from "./ConversationFooter";
import { ConversationPanel } from "./ConversationPanel";
import Image from "next/image";
import { useSelector } from "react-redux";

export const RoomPanel = () => {
  const { shortId, roomId, name } = useSelector(
    (state: chatState) => state.chat
  );
  const { id } = useSelector((state: userState) => state.user);
  console.log(shortId, roomId, name);

  return (
    <div className="flex flex-col flex-grow h-full w-full h-full">
      <ChatHeader name={name} />
      <ConversationPanel roomId={roomId} id={id} />
      <ConversationFooter shortId={shortId} userId={id} />
    </div>
  );
};
function ChatHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between w-full bg-wpp-green.300 px-4 py-[10px] ml-[2px]">
      <div className="flex gap-2 items-center w-full">
        <Image
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          className="inline object-cover w-[40px] h-[40px] rounded-full max-w-none"
          width="100"
          height="100"
          alt="Profile image"
        />
        <div className="flex flex-col flex-grow">
          <span className="text-md text-white font-sans">{name}</span>
          <span className="text-xs truncate flex-grow text-white font-sans">
            Pepito, fulano, mengano, fulana, mengana, roberto
          </span>
        </div>
        <div className="flex flex-shrink gap-7 pr-3">
          <MdOutlineSearch className="text-gray-400 text-2xl  top-1/4 left-4" />
          <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
        </div>
      </div>
    </div>
  );
}
