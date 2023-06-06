import { UserData } from "@/components/UserData";
export default function User() {
  return (
    <section className="w-screen h-screen overflow-auto flex items-center justify-center">
      <div className="flex flex-col md:min-w-[40%] min-h-[50%] sm:min-w-[300px] rounded-lg px-2 pt-10 pb-14 gap-5 bg-wpp-green.300">
        <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
          Perfil
        </h2>
        <UserData />
      </div>
    </section>
  );
}
