import userService from "../services/user";
import loginService from "../services/login";

import { INotification } from "../types/notification";
import { IUser } from "../types/user";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { AxiosError } from "axios";

interface LoginFormProps {
  notification: INotification | null;
  notificationTimeoutId: number | undefined;
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
  setNotificationTimeoutId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

const LoginForm: React.FC<LoginFormProps> = ({
  notification,
  notificationTimeoutId,
  setLoggedUser,
  setNotification,
  setNotificationTimeoutId,
}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      const notification: INotification = {
        message: "User successfully logged in!",
        type: "success",
      };

      userService.setUser(user);
      setLoggedUser(user);

      setNotification(notification);

      clearTimeout(notificationTimeoutId);
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNotificationTimeoutId(timeoutId);

      setUsername("");
      setPassword("");

      navigate("/");
    } catch (e: unknown) {
      const err = e as AxiosError;
      if (err.response && err.response.status === 500) {
        const notification: INotification = {
          message: "Failed to connect to the server.",
          type: "error",
        };

        setNotification(notification);

        clearTimeout(notificationTimeoutId);
        const timeoutId = setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNotificationTimeoutId(timeoutId);

        return;
      }

      if (err.response && err.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (and the server sends error message)
        const notification: INotification = {
          message: err.response.data.message,
          type: "error",
        };

        setNotification(notification);

        clearTimeout(notificationTimeoutId);
        const timeoutId = setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNotificationTimeoutId(timeoutId);

        return;
      }

      const notification: INotification = {
        message: "Failed to connect to the server.",
        type: "error",
      };

      setNotification(notification);

      clearTimeout(notificationTimeoutId);
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNotificationTimeoutId(timeoutId);
    }
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto px-16 md:px-36 ${notification ? "py-3 md:py-5" : "py-12"} grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left`}
    >
      <div className="md:col-span-2">
        <img
          src="/logo.png"
          alt="MyPeace Logo"
          className="mx-auto max-w-[225px] lg:max-w-[300px]"
        />

        <div className="mt-4 text-center">
          <h3 className="text-2xl font-semibold">MyPeace</h3>

          <p className="text-gray-500 dark:text-gray-400">
            Complete Emotional Health Support
          </p>
        </div>
      </div>

      <div className="ml-0 text-left my-auto md:col-span-2">
        <h3 className="text-3xl font-semibold mb-2">Log In</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 dark:text-blue-500">
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleLogin}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Show password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold tracking-wide rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
