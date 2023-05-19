import { RoomPanel } from "@/components/RoomPanel/RoomPanel";
import { UserPanel } from "@/components/UserPanel/UserPanel";

export default function Rooms() {
  return (
    <>
      <section className="flex container mx-auto h-screen lg:h-[95%] self-center w-full items-center justify-center shadow-lg">
        <UserPanel />
        <RoomPanel />
      </section>
    </>
  );
}
