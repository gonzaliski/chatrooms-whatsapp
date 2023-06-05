"use client";
import { RoomPanel } from "@/components/RoomPanel/RoomPanel";
import { UserPanel } from "@/components/UserPanel/UserPanel";
import { userSelector } from "@/redux/selectors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../loading";

export default function Rooms() {
  useAuth();
  const router = useRouter();
  const [pageloading, setPageLoading] = useState(true);
  const { id, loading, isAuth } = useSelector(userSelector);
  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/");
    }
    setPageLoading(false);
  }, [id]);

  return (
    <>
      {pageloading ? (
        <Loading />
      ) : (
        <section className="flex lg:container lg:mx-auto h-screen lg:h-[95%] self-center w-full items-center md:justify-center shadow-lg overflow-y-hidden md:overflow-y-visible">
          <UserPanel />
          <RoomPanel />
        </section>
      )}
    </>
  );
}
