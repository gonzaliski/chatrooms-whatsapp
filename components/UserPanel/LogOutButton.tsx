"use client";
import { reset } from "@/redux/slices/chatSlice";
import { logOut } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

export const LogOutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    router.push("/");
    await userService.logOut();
    dispatch(logOut());
    dispatch(reset());
  };
  return (
    <MdOutlineLogout
      className="text-gray-400 text-2xl cursor-pointer hover:brightness-200"
      onClick={handleLogOut}
    />
  );
};
