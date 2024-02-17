import { IUser } from "../types/user";

let token: string | null = null;

const STORAGE_KEY = "loggedMyPeaceUser";

const setUser = (user: IUser) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  token = user.token;
};

const getUser = () => {
  const loggedUserJSON = localStorage.getItem(STORAGE_KEY);

  if (!loggedUserJSON) {
    return null;
  }

  const user = JSON.parse(loggedUserJSON);
  token = user.token;
  return user;
};

const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY);
  token = null;
};

const getToken = () => token;

const exportedObject = {
  setUser,
  clearUser,
  getUser,
  getToken,
};

export default exportedObject;
