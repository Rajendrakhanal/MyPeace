import { INotification } from "../types/notification";
import signUpService from "../services/signup";

import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface SignupFormInterface {
  notification: INotification | null;
  notificationTimeoutId: number | undefined;
  setNotification: React.Dispatch<React.SetStateAction<INotification | null>>;
  setNotificationTimeoutId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

const SignupForm: React.FC<SignupFormInterface> = ({
  notification,
  notificationTimeoutId,
  setNotification,
  setNotificationTimeoutId,
}) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUpService.signup({
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
      });

      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");

      const notification: INotification = {
        message: "Registration successful, please login.",
        type: "success",
      };

      setNotification(notification);

      clearTimeout(notificationTimeoutId);
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNotificationTimeoutId(timeoutId);
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
        console.log("err.response", err.response);
        console.log("err.response.data", err.response.data);

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
        <h3 className="text-3xl font-semibold">Create your Account</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 dark:text-blue-500">
            Log In
          </Link>
        </p>

        <form className="max-w-" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>

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

          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPassword ? "text" : "password"}
              name="repeat_password"
              id="repeat_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
