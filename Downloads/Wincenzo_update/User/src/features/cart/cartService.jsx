import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";
import { config } from "../../configs/axiosConfig";

// const baseUrl = process.env.REACT_APP_BASE_URL;

const getCart = async (data) => {
  const res = await axios.get(`${baseUrl}carts/${data}`, config);
  return res.data;
};
const addCart = async (data) => {
  console.log("Auth token",config?.headers)
  const res = await axios.post(`${baseUrl}carts`, data, config);
  return res.data;
};
const updateCart = async (DATA) => {
  const res = await axios.put(
    `${baseUrl}carts/${DATA?.id}`,
    DATA,
    config
  );

  return res.data;
};

const deleteCartItem = async (data) => {
  const res = await axios.delete(`${baseUrl}carts/${data}`, config);
  return res.data;
};

const deleteCartAllItem = async (data) => {
  const res = await axios.post(`${baseUrl}carts/removecartitem`,data, config);
  return res.data;
};




const cartService = {
  getCart,
  addCart,
  updateCart,
  deleteCartItem,
  deleteCartAllItem,
};

export default cartService;
