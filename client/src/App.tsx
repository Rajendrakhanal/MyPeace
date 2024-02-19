import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import PageNotFound from "./components/PageNotFound";
import Notification from "./components/Notification";
import Chat from "./components/Chat";

import userService from "./services/user";
import { INotification } from "./types/notification";

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  const [loggedUser, setLoggedUser] = useState(userService.getUser());
  const [notification, setNotification] = useState<INotification | null>(null);
  const [notificationTimeoutId, setNotificationTimeoutId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    const user = userService.getUser();
    setLoggedUser(user);
  }, []);

  return (
    <div>
      <Navbar
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
        setNotification={setNotification}
        notificationTimeoutId={notificationTimeoutId}
        setNotificationTimeoutId={setNotificationTimeoutId}
      />

      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      <Routes>
        <Route
          path="/"
          element={
            loggedUser ? (
              loggedUser.firstUser ? (
                <Home />
              ) : (
                <Navigate to="/chat" />
              )
            ) : (
              <LandingPage notification={notification} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            loggedUser ? (
              <Navigate to="/" />
            ) : (
              <SignupForm
                notification={notification}
                setNotification={setNotification}
                notificationTimeoutId={notificationTimeoutId}
                setNotificationTimeoutId={setNotificationTimeoutId}
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            <LoginForm
              notification={notification}
              setLoggedUser={setLoggedUser}
              setNotification={setNotification}
              setNotificationTimeoutId={setNotificationTimeoutId}
              notificationTimeoutId={notificationTimeoutId}
            />
          }
        />
        
        <Route path="/chat" element={<Chat />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
