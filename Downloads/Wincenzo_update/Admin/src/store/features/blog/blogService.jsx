import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;
const getblogs = async () => {
  const res = await axios.get(`${baseUrl}blog`);
  return res.data;
};
const Addblog = async (data) => {
  console.log("data", data);
  const res = await axios.post(`${baseUrl}blog`, data, config);
  return res.data;
};
const Delblog = async (data) => {
  const res = await axios.delete(`${baseUrl}blog/${data}`, config);
  return res.data;
};
const Editblog = async (data) => {
  const res = await axios.put(
    `${baseUrl}blog/${data.id}`,
    data.formData,
    config
  );
  return res.data;
};
const getblog = async (data) => {
  const res = await axios.get(`${baseUrl}blog/${data}`);
  return res.data;
};

const blogService = {
  getblogs,
  Addblog,
  Delblog,
  Editblog,
  getblog,
};

export default blogService;
