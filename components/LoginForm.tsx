"use client";
import { useAuth } from "@/hooks/useAuth";
import { userSelector } from "@/redux/selectors";
import { setUserData } from "@/redux/slices/userSlice";
import { userService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { ErrorCard } from "./ErrorCard";
import { MainForm } from "./MainForm";
import { Spinner } from "./loaders/Spinner";
import { UserData } from "./UserData";

export const LoginForm = () => {
  useAuth();
  const router = useRouter();
  const [register, setRegister] = useState(true);
  const { isAuth, name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(true);
  const [showFillProfile, setShowFillProfile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await userService.signUp(email, password);
      dispatch(setUserData({ id: res.id, email: res.email }));
      setShowFillProfile(true);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await userService.signIn(email, password);
      dispatch(setUserData(res));
      if (name) {
        router.push("/rooms");
      } else {
        setShowFillProfile(true);
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      setError(e.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const res = await userService.loginWithGoogle();
      dispatch(setUserData(res));
      router.push("/rooms");
    } catch (error: any) {
      setError("Ha ocurrido un error");
    }
  };

  const handleCancel = () => {
    setRegister(true);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleEnableLogin = () => {
    setError("");
    setRegister(false);
  };

  useEffect(() => {
    if (isAuth && name) {
      router.push("/rooms");
    }
    // if (isAuth == null && !name) {
    //   setShowFillProfile(false);
    // }
    setIsLoading(false);
  }, [isAuth]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-white font-normal text-xl sm:text-2xl md:text-3xl md:w-80 md:text-center">
        {register ? "Registrate para comenzar" : "Ingresar"}
      </h2>

      {!showFillProfile ? (
        <>
          <Auth
            handleEmailChange={setEmail}
            handlePassChange={setPassword}
            email={email}
            password={password}
            handler={register ? handleRegister : handleLogin}
            isDisabled={loading}
          />
          {!register && (
            <button
              className="flex items-center justify-center gap-3 px-3 text-sm w-full rounded-2xl border-2 border-solid border-red-500 text-white p-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
          {register && (
            <div className="flex items-center justify-between w-full">
              <p className="text-white">Ya tenés una cuenta?</p>
              <button
                className="rounded-2xl bg-wpp-darkblue text-white p-2 hover:brightness-75"
                onClick={handleEnableLogin}
              >
                Ingresar
              </button>
            </div>
          )}
          <button
            className="flex items-center gap-3 px-3 text-md  rounded-2xl bg-wpp-darkblue text-white p-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle /> Ingresar con google
          </button>
        </>
      ) : (
        <UserData />
      )}
      {error && <ErrorCard msg={error} />}
    </div>
  );
};

const Auth = ({
  handleEmailChange,
  handlePassChange,
  email,
  password,
  isDisabled,
  handler,
}: AuthProps) => {
  return (
    <MainForm onSubmit={handler}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          name="email"
          type="email"
          onChange={(e) => handleEmailChange(e.target.value)}
          value={email}
          placeholder="ejemplo@email.com"
          className="p-2 rounded-md text-white bg-wpp-darkblue hover:accent-wpp-darkblue"
          required
        ></input>
        <label htmlFor="password" className="text-white">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          onChange={(e) => handlePassChange(e.target.value)}
          value={password}
          placeholder="contraseña"
          className="p-2 rounded-md text-white bg-wpp-darkblue"
          required
        ></input>
      </div>
      <button
        className="rounded-2xl bg-wpp-primary text-white p-2"
        disabled={isDisabled}
      >
        {!isDisabled ? "Enviar" : <Spinner />}
      </button>
    </MainForm>
  );
};
