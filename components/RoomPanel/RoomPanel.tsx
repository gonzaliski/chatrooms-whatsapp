"use client";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineSearch } from "react-icons/md";
import { ConversationFooter } from "./ConversationFooter";
import { ConversationPanel } from "./ConversationPanel";
import Image from "next/image";
import { useSelector } from "react-redux";
import { chatSelector, userSelector } from "@/redux/selectors";
import AppLogo from "../../public/chatrooms-icon.png";
import { useEffect, useState } from "react";

export const RoomPanel = () => {
  const { shortId, roomId, name, participants } = useSelector(chatSelector);
  const { id } = useSelector(userSelector);
  return !roomId ? (
    <section className="flex flex-col container mx-auto h-full items-center justify-center gap-5 bg-wpp-green.300">
      <div className="flex items-center gap-2 justify-center">
        <h1 className="inline text-white font-bold text-3xl sm:text-4xl md:text-6xl ">
          ChatRooms
        </h1>
        <Image
          src={AppLogo}
          alt={"AppLogo"}
          className="inline w-[120px] sm:w-1/4 md:1/2 animate-bounce-slow"
        />
      </div>
      <h2 className="text-white font-thin text-md sm:text-lg md:text-xl">
        Imitación de Whatsapp
      </h2>
      <h1 className="inline text-white font-bold text-lg sm:text-md md:text-2xl ">
        Comenzá a chatear!
      </h1>
    </section>
  ) : (
    <div className="flex flex-col flex-grow h-full w-full h-full min-w-[70%]">
      <ChatHeader name={name} shortId={shortId} participants={participants} />
      <ConversationPanel roomId={roomId} id={id} shortId={shortId} />
      <ConversationFooter shortId={shortId} participants={participants} />
    </div>
  );
};
function ChatHeader({
  name,
  shortId,
  participants,
}: {
  name: string;
  shortId: string;
  participants: participant[];
}) {
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
          <span className="text-md text-white font-sans">{`${name} (${shortId})`}</span>
          <span className="text-xs truncate flex-grow text-white font-sans">
            {participants?.map((p) => p.name).join(", ")}
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
