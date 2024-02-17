import { INotification } from "../types/notification";

interface NotificationProps {
  notification: INotification | null;
  setNotification: (notification: INotification | null) => void;
}

const Notification: React.FC<NotificationProps> = ({
  notification,
  setNotification,
}) => {
  if (!notification) {
    return null;
  }

  let color: string = "green";

  if (notification.type === "error") {
    color = "red";
  } else if (notification.type === "info") {
    color = "blue";
  }

  const colorClasses: { [key: string]: string } = {
    error:
      "text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
    info: "text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800",
    default:
      "text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800",
  };

  return (
    <div
      className={`flex items-center px-4 mx-4 md:mx-32 lg:mx-48 mt-4 md:mt-4 p-4 rounded-lg ${colorClasses[notification.type] || colorClasses.default}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>

      <span className="sr-only">
        {notification.type[0].toUpperCase() + notification.type.slice(1)}
      </span>

      <div className="ms-3 font-medium">{notification.message}</div>

      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${color}-400 dark:hover:bg-gray-700`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => setNotification(null)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
