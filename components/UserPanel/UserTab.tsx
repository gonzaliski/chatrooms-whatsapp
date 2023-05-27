"use client";
import { useAuth } from "@/hooks/useAuth";
import { userSelector } from "@/redux/selectors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdChat, MdGroups } from "react-icons/md";
import { useSelector } from "react-redux";
import defaultUser from "../../public/deafultUserPhoto.jpg";
import { LogOutButton } from "./LogOutButton";

export const UserTab = () => {
  useAuth();
  const { photoURL } = useSelector(userSelector);
  const router = useRouter();
  return (
    <div className="flex items-center justify-between w-full bg-wpp-green.300 px-4 py-[10px]">
      <Image
        src={photoURL || defaultUser}
        className="inline object-cover w-[40px] h-[40px] rounded-full max-w-none cursor-pointer"
        width="100"
        height="100"
        alt="Profile image"
        onClick={() => router.push("/user")}
      />
      <div className="flex items-center justify-between gap-5">
        <MdGroups className="text-gray-400 text-3xl" />
        <LogOutButton />
        <MdChat className="text-gray-400 text-2xl" />
        <HiOutlineDotsVertical className="text-gray-400 text-2xl" />
      </div>
    </div>
  );
};
