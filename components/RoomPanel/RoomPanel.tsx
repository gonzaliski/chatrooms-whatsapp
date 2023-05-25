"use client";
import { chatSelector } from "@/redux/selectors";
import Image from "next/image";
import { useSelector } from "react-redux";
import AppLogo from "../../public/chatrooms-icon.png";
import { Conversation } from "./Conversation/Conversation";

export const RoomPanel = () => {
  const { roomId } = useSelector(chatSelector);
  return !roomId ? <RoomPreview /> : <Conversation />;
};

const RoomPreview = () => {
  return (
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
  );
};
