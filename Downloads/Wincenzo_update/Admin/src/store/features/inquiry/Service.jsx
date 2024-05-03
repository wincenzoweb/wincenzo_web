import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;

const addInquiry = async (data) => {
  const res = await axios.post(`${baseUrl}inquiry`, data, config);
  return res.data;
};
const DeleteInquiry = async (data) => {
  const res = await axios.delete(`${baseUrl}inquiry/${data}`, config);
  return res.data;
};
const EditInquiry = async (data) => {
  const res = await axios.put(
    `${baseUrl}inquiry/${data.id}`,
    data.formData,
    config
  );
  return res.data;
};
const getInquiry = async () => {
  const res = await axios.get(
    `${baseUrl}inquiry`,

    config
  );
  return res.data;
};

const getSubscriber = async () => {
  const res = await axios.get(`${baseUrl}subscriber`, config);
  return res.data;
};

const deleteSubscriber = async (data) => {
  const res = await axios.delete(`${baseUrl}subscriber/${data}`, config);
  return res.data;
};

const getAllmessage = async () => {
  const res = await axios.get(`${baseUrl}message`, config);
  return res.data;
};

const deleteMessage = async (data) => {
  const res = await axios.delete(`${baseUrl}message/${data}`, config);
  return res.data;
};

const Service = {
  addInquiry,
  DeleteInquiry,
  EditInquiry,
  getInquiry,
  getSubscriber,
  deleteSubscriber,
  getAllmessage,
  deleteMessage,
};

export default Service;
