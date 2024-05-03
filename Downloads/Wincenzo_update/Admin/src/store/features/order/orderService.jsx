import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;
const getorders = async () => {
  const res = await axios.get(`${baseUrl}orders`,config);
  return res.data;
};
const getordersByUserid = async (data) => {
  const res = await axios.get(`${baseUrl}orders/user/${data}`, config);
  return res.data;
};
const Addorder = async (data) => {
  const res = await axios.post(`${baseUrl}orders`, data, config);
  return res.data;
};
const Delorder = async (data) => {
  const res = await axios.delete(`${baseUrl}orders/${data}`, config);
  return res.data;
};
const Editorder = async (data) => {
  const res = await axios.put(
    `${baseUrl}orders/${data.id}`,
    data.formData,
    config
  );
  return res.data;
};

const orderService = {
  getorders,
  Addorder,
  Delorder,
  Editorder,
  getordersByUserid,
};

export default orderService;
