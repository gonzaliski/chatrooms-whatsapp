import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";
import AppLogo from "../public/chatrooms-icon.png";

export default function Home() {
  return (
    <>
      <section className="flex flex-col container mx-auto h-full items-center justify-center gap-5">
        <div className="flex items-baseline gap-2 justify-center">
          <h1 className="inline text-white font-bold text-3xl sm:text-4xl md:text-6xl ">
            ChatRooms
          </h1>
          <Image
            src={AppLogo}
            alt={"AppLogo"}
            className="animate-bounce-slow inline w-30 sm:w-20 md:w-40 "
          />
        </div>
        <h2 className="text-white font-thin text-md sm:text-lg md:text-xl">
          Imitación de Whatsapp
        </h2>

        <LoginForm />
      </section>
    </>
  );
}
