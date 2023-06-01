"use client";
import { logOut } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

export const LogOutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      await userService.logOut();
      dispatch(logOut());
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <MdOutlineLogout
      className="text-gray-400 text-2xl cursor-pointer hover:brightness-200"
      onClick={handleLogOut}
    />
  );
};
