"use client";
import { RoomPanel } from "@/components/RoomPanel/RoomPanel";
import { UserPanel } from "@/components/UserPanel/UserPanel";
import { userSelector } from "@/redux/selectors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Rooms() {
  const router = useRouter();
  const { id, loading } = useSelector(userSelector);
  useEffect(() => {
    if (loading && !id) {
      console.log("yendose");

      router.push("/");
    }
  }, [id]);

  return (
    <>
      <section className="flex container mx-auto h-screen lg:h-[95%] self-center w-full items-center justify-center shadow-lg">
        <UserPanel />
        <RoomPanel />
      </section>
    </>
  );
}
