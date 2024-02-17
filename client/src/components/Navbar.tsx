import userService from "../services/user";

import { MdArrowForwardIos } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { INotification } from "../types/notification";
import { IUser } from "../types/user";

interface NavbarProps {
  loggedUser: IUser | null;
  setLoggedUser: (user: IUser | null) => void;
  setNotification: (notification: INotification | null) => void;
  notificationTimeoutId: number | undefined;
  setNotificationTimeoutId: (id: number | undefined) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  loggedUser,
  notificationTimeoutId,
  setLoggedUser,
  setNotification,
  setNotificationTimeoutId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (!loggedUser) {
      setNotification({
        message: "User doesn't exist.",
        type: "error",
      });

      clearTimeout(notificationTimeoutId);
      const timeoutId = setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNotificationTimeoutId(timeoutId);

      return;
    }

    userService.clearUser();

    setLoggedUser(null);

    setNotification({
      message: `User ${loggedUser.firstName} logged out.`,
      type: "info",
    });

    clearTimeout(notificationTimeoutId);
    const timeoutId = setTimeout(() => {
      setNotification(null);
    }, 5000);
    setNotificationTimeoutId(timeoutId);

    navigate("/");
  };

  return (
    <nav className="bg-gray-900 border-gray-200 text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:px-36">
        <Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
          to="/"
        >
          <img src="/logo.png" className="h-14" alt="MyPeace Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white tracking-wide">
            MyPeace
          </span>
        </Link>

        {loggedUser ? (
          <button
            className="flex flex-row justify-center items-center gap-2 px-5 py-3 w-18 font-bold tracking-wide rounded-full bg-gray-600 hover:bg-gray-700"
            onClick={handleLogout}
          >
            Log out <MdArrowForwardIos />
          </button>
        ) : (
          location.pathname == "/" && (
            <Link to="/login">
              <button className="flex flex-row justify-center items-center gap-2 px-5 py-3 w-18 font-bold tracking-wide rounded-full bg-blue-600 hover:bg-blue-700">
                Log In <MdArrowForwardIos />
              </button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
