import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { config } from "@/configs/axiosConfig";

const getProducts = async () => {
  const res = await axios.get(`${baseUrl}products/`);
  return res.data;
};
const getProduct= async (data) => {
  const res = await axios.get(`${baseUrl}products/${data}`);
  return res.data;
};
const addProducts = async (data) => {
  const res = await axios.post(`${baseUrl}products/`, data, config);
  return res.data;
};
const deleteProducts = async (data) => {
  const res = await axios.delete(`${baseUrl}products/${data}`, config);
  return res.data;
};
const updateProducts = async (data) => {
  const res = await axios.put(
    `${baseUrl}products/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};

const deleteProductsReview = async (data) => {
  console.log(data)
  let {productId,ratingId} = data
  const res = await axios.delete(`${baseUrl}products/${productId}/ratings/${ratingId}`, config);
  return res.data;
};

const productService = {
  getProducts,
  addProducts,
  deleteProducts,
  updateProducts,
  getProduct,
  deleteProductsReview,
};

export default productService;
