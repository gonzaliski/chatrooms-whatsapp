import Image from "next/image";
import logo from "../public/chatrooms-icon.png";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image
        src={logo}
        alt={"logo"}
        className="animate-pulse w-[200px] h-[200px]"
      ></Image>
    </div>
  );
}
