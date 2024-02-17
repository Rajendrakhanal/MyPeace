import axios from "axios";
const baseUrl = "/api/v1/users/register";

const signup = async (credentials: {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const exportedObject = { signup };

export default exportedObject;
