import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;
const getCategories = async () => {
  const res = await axios.get(`${baseUrl}categories/`);
  return res.data;
};
const Addcategory = async (data) => {
  console.log("data",data);
  const res = await axios.post(`${baseUrl}categories`,data,config);
  return res.data;
};
const Delcategory = async (data) => {
  const res = await axios.delete(`${baseUrl}categories/${data}`,config);
  return res.data;
};
const Editcategory = async (data) => {
  const res = await axios.put(`${baseUrl}categories/${data.id}`,data.formData,config);
  return res.data;
};

const categoryService = {
  getCategories,
  Addcategory,
  Delcategory,
  Editcategory,
};

export default categoryService;
