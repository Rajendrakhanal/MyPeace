import axios from "axios";
const baseUrl = "api/v1/users/login/";

const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const exportedObject = { login };

export default exportedObject;
