import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";
import { config } from "../../configs/axiosConfig";
// const baseUrl = process.env.REACT_APP_BASE_URL;
const login = async (userData) => {
  console.log(userData);
  const res = await axios.post(`${baseUrl}users/login`, userData);

  if (res.data) {
    localStorage.setItem("USER", JSON.stringify(res.data?.user));
    localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
  }
  return res.data;
};
const reg = async (userData) => {
  const res = await axios.post(`${baseUrl}users`, userData);
  return res.data;
};

const out = () => {
  localStorage.removeItem("USER");
};

const loginotp = async (DATA) => {
  const res = await axios.post(`${baseUrl}users/check-verification`, DATA);
  if (res.data) {
    localStorage.setItem("USER", JSON.stringify(res.data?.unverifiedUser));
    localStorage.setItem("TOKEN", JSON.stringify(res.data?.token));
  }
  return res.data;
};
const getAuser = async (DATA) => {
  const res = await axios.get(`${baseUrl}users/${DATA}`, config);

  return res.data;
};
const updateUser = async (DATA) => {
  const res = await axios.put(
    `${baseUrl}users/${DATA?.id}`,
    DATA?.formData,
    config
  );

  localStorage.removeItem("USER");

  return res.data;
};

const forgotPassword = async (DATA) => {
  const res = await axios.post(`${baseUrl}users/forgot-password-token`, DATA);

  return res.data;
};
const resetPassword = async (DATA) => {
  const res = await axios.put(
    `${baseUrl}users/reset-password/${DATA.token}`,
    DATA
  );

  return res.data;
};
const allOrders = async (DATA) => {
  const res = await axios.get(`${baseUrl}orders/user/${DATA}`, config);

  return res.data;

};
const addOrders = async (DATA) => {
  const res = await axios.post(`${baseUrl}orders`,DATA, config);

  if (res.data?.order && res.data?.order?.user) {
    // Update the user data in local storage
    localStorage.setItem("USER", JSON.stringify(res.data?.order?.user));
  }
  return res.data;
};


const getwishlist = async (data) => {
  const res = await axios.get(`${baseUrl}wishlist/${data}`, config);
  return res.data;
};
const addwishlist = async (data) => {
  const res = await axios.post(`${baseUrl}wishlist`, data, config);
  return res.data;
};

const deletewishlist = async (data) => {
  const res = await axios.delete(`${baseUrl}wishlist/${data}`, config);
  return res.data;
};
const authService = {
  login,
  reg,
  out,
  loginotp,
  getAuser,
  updateUser,
  forgotPassword,
  resetPassword,
  allOrders,
  addOrders,
  deletewishlist,
  addwishlist,
  getwishlist,
};

export default authService;
