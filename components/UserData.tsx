"use client";
import { AttatchFile } from "@/components/AttatchFile";
import { ErrorCard } from "@/components/ErrorCard";
import { imageSelector, userSelector } from "@/redux/selectors";
import { unselectImage } from "@/redux/slices/imageSlice";
import { userService } from "@/services/userService";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultUser from "../public/deafultUserPhoto.jpg";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "./loaders/Spinner";
export const UserData = () => {
  useAuth();
  const { name, photoURL, isNew } = useSelector(userSelector);
  const { file } = useSelector(imageSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState<Blob>();
  const handleError = (e: string) => {
    setError(e);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      let payload = {};
      if (img) {
        const url = await uploadImage(img);
        payload = { photoURL: url };
      }
      if (value) {
        payload = { ...payload, displayName: value };
      }
      await userService.updateData(payload);
      setIsLoading(false);
      dispatch(unselectImage());
      router.push("/rooms");
    } catch (e: any) {
      setIsLoading(false);
      setError(e.toString());
    }
  };
  return (
    <div className="flex flex-col md:min-w-[40%] min-h-[50%] sm:min-w-[300px] rounded-lg px-2 pt-10 pb-14 gap-5 bg-wpp-green.300">
      <h2 className="text-white text-center font-thin text-sm sm:text-lg md:text-2xl">
        Perfil
      </h2>
      <form className="flex flex-col items-center gap-5 container max-w-[50%]">
        <div className="w-full">
          <label htmlFor="value" className="text-gray-400 text-sm">
            Nombre
          </label>
          <div className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="value"
              onChange={(e) => setValue(e.target.value)}
              value={value || name}
              disabled={isLoading}
              placeholder="Nombre"
              className="p-1 focus:outline-none rounded-md text-white bg-wpp-darkblue"
            ></input>
          </div>
        </div>
        <Image
          src={file || photoURL || defaultUser}
          placeholder="empty"
          priority={true}
          quality={100}
          className="inline object-cover w-[300px] h-[300px] rounded-full max-w-none mt-2"
          width="100"
          height="100"
          alt="Profile image"
        />
        <div
          className={`flex items-center gap-4 text-white ${
            isLoading && "pointer-events-none"
          }`}
        >
          <AttatchFile onError={handleError} onImg={setImg} />
          Seleccionar imagen
        </div>
        {isNew && (
          <button
            className="rounded-md bg-wpp-darkblue text-white p-1 w-full self-end"
            type="button"
            onClick={() => router.push("/rooms")}
            disabled={isLoading}
          >
            Volver
          </button>
        )}
        <button
          className="rounded-md bg-wpp-primary text-white p-1 w-full self-end"
          type="button"
          onClick={handleUpdateUser}
          disabled={isLoading}
        >
          Guardar cambios
        </button>

        {isLoading && <Spinner />}
        {error && <ErrorCard msg={error} />}
      </form>
    </div>
  );
};
