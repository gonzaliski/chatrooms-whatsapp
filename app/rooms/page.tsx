"use client";
import { RoomPanel } from "@/components/RoomPanel/RoomPanel";
import { UserPanel } from "@/components/UserPanel/UserPanel";
import { userSelector } from "@/redux/selectors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";

export default function Rooms() {
  const router = useRouter();
  const [pageloading, setPageLoading] = useState(true);
  const { id, loading } = useSelector(userSelector);
  useEffect(() => {
    if (loading && !id) {
      console.log("yendose");
      router.push("/");
    }
    setPageLoading(false);
  }, [id]);

  return (
    <>
      {pageloading ? (
        <Loading />
      ) : (
        <section className="flex lg:container lg:mx-auto h-screen lg:h-[95%] self-center w-full items-center justify-center shadow-lg">
          <UserPanel />
          <RoomPanel />
        </section>
      )}
    </>
  );
}
