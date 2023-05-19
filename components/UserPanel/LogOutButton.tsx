"use client";
import { logOut } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

export const LogOutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = () => {
    userService.removeUserCredentialsOnLS();
    dispatch(logOut());
    router.push("/");
  };
  return (
    <MdOutlineLogout
      className="text-gray-400 text-2xl"
      onClick={handleLogOut}
    />
  );
};
