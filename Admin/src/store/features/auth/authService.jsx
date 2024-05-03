import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

// import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const res = await axios.post(`${baseUrl}users/login`, userData);

  if (res.data) {
    localStorage.setItem("ADMIN", JSON.stringify(res.data?.user));
    localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
  }
  return res.data;
};
const forgotPass = async (userData) => {
  const res = await axios.post(`${baseUrl}users/forgotpassword`, userData);

  return res.data;
};
const forgotPassVerify = async (userData) => {
  const res = await axios.post(
    `${baseUrl}users/forgotpassword/verify`,
    userData
  );

  return res.data;
};

const loginotp = async (DATA) => {
  const res = await axios.post(`${baseUrl}users/check-verification`, DATA);
  if (res.data) {
    localStorage.setItem("ADMIN", JSON.stringify(res.data?.unverifiedUser));
    localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
  }
  return res.data;
};
// const reg = async (userData) => {
//   const res = await axios.post(`${baseUrl}user/addadmin`, userData);
//   return res.data;
// };

const authService = {
  login,
  // reg,
  forgotPass,
  forgotPassVerify,
  loginotp,
};

export default authService;
