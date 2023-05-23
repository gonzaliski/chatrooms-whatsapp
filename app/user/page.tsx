"use client";
import { ErrorCard } from "@/components/ErrorCard";
import { userSelector } from "@/redux/selectors";
import { addUserData } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function User() {
  return (
    <section className="w-screen h-screen overflow-auto flex items-center justify-center">
      <UserData />
    </section>
  );
}

const UserData = () => {
  const { name, id } = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleUpdateUser = async () => {
    try {
      await userService.updateUser(value, id);
      dispatch(addUserData({ name: value }));
      router.push("/rooms");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };
  return (
    <div className="flex flex-col md:min-w-[40%] min-h-[50%] sm:min-w-[300px] rounded-lg p-5 gap-5 bg-wpp-green.300">
      <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
        Perfil
      </h2>
      <form className="flex flex-col gap-5 container max-w-[50%] content-stretch">
        <label htmlFor="value" className="text-gray-400 text-sm">
          Nombre
        </label>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="value"
            onChange={(e) => setValue(e.target.value)}
            value={value || name}
            placeholder="Nombre"
            className="p-1 focus:outline-none rounded-md text-white bg-wpp-darkblue"
          ></input>
        </div>
        <button
          className="rounded-md bg-wpp-primary text-white p-1 w-full self-end"
          type="button"
          onClick={handleUpdateUser}
        >
          Guardar cambios
        </button>
        {error && <ErrorCard msg={error} />}
      </form>
    </div>
  );
};
