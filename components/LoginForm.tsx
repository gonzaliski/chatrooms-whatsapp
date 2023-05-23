"use client";
import { addUserData, addUserEmail } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [nextStep, setNextStep] = useState(false);
  const [title, setTitle] = useState("Ingresá tu email para comenzar");
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState(false);
  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    let email = e.target.email.value;
    setEmail(email);
    dispatch(addUserEmail({ email }));
    const [res, status] = await userService.sendCode(email);
    console.log(status);

    if (status == 201) setNewUser(true);
    setTitle(res);
    setNextStep(true);
  };
  const handleCodeSubmit = async (e: any) => {
    e.preventDefault();
    const { token, userId, name } = await userService.getToken(
      e.target.code.value,
      email
    );
    if (newUser) {
      console.log("es nuevo");

      dispatch(addUserData({ token, userId }));
      return router.push("/user");
    }
    dispatch(addUserData({ token, userId, name }));
    router.push("/rooms");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-white font-normal text-xl sm:text-2xl md:text-3xl">
        {title}
      </h2>
      {!nextStep ? (
        <form className="flex flex-col gap-5" onSubmit={handleEmailSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="ejemplo@email.com"
              className="p-2 rounded-md text-white bg-wpp-darkblue w-[250px] sm:w-[300px]"
            ></input>
          </div>
          <button className="rounded-2xl bg-wpp-primary text-white p-2">
            Enviar
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-2" onSubmit={handleCodeSubmit}>
          <label htmlFor="email" className="text-white">
            Código
          </label>
          <input
            type="text"
            name="code"
            placeholder="Código"
            className="p-1 rounded-md text-white bg-wpp-darkblue w-[250px] sm:w-[300px]"
          ></input>
          <button className="rounded-2xl bg-wpp-primary text-white p-2">
            Enviar
          </button>
        </form>
      )}
    </div>
  );
};
