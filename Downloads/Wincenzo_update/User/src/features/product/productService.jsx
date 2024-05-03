import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";
import { config } from "../../configs/axiosConfig";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const getProducts = async () => {
  const res = await axios.get(`${baseUrl}products/`);
  return res.data;
};
const getProduct = async (data) => {
  const res = await axios.get(`${baseUrl}products/${data}`);
  return res.data;
};
const ProductFilter = async (data) => {
  let { category, name, page, limit } = data;

  console.log("page", page);
  const res = await axios.get(
    `${baseUrl}products/filterproduct?limit=${limit}&page=${page}${
      name ? `&name=${name}` : ""
    }${category ? `?&category=${category}` : ""}`
  );
  return res.data;
};

const getCategories = async () => {
  const res = await axios.get(`${baseUrl}categories/`);
  return res.data;
};

const addReview = async (data)=>{
  let {productId}= data;
  const res = await axios.post(`${baseUrl}products/${productId}/ratings`,data,config);
  return res.data;
}

const productService = {
  getProducts,
  getCategories,
  getProduct,
  ProductFilter,
  addReview,
};

export default productService;
