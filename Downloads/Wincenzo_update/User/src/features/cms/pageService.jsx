import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";
import { config } from "../../configs/axiosConfig";

// const baseUrl = process.env.REACT_APP_BASE_URL;
const getAllBlogs = async () => {
  const res = await axios.get(`${baseUrl}blog`);
  return res.data;
};

const getblog = async (data) => {
  const res = await axios.get(`${baseUrl}blog/${data}`);
  return res.data;
};
const getHome = async () => {
  const res = await axios.get(`${baseUrl}homepage`);
  return res.data;
};

const getTandC = async () => {
  const res = await axios.get(`${baseUrl}conditions`);
  return res.data;
};

const getAbout = async () => {
  const res = await axios.get(`${baseUrl}aboutpage`);
  return res.data;
};

const getCancellation = async () => {
  const res = await axios.get(`${baseUrl}cancellationandrefund`);
  return res.data;
}


const getshippinganddelivery = async () => {
  const res = await axios.get(`${baseUrl}shippinganddelivery`);
  return res.data;
};

const getPolicy = async () => {
  const res = await axios.get(`${baseUrl}policy`);
  return res.data;
};
const addinquiry = async (data) => {
  const res = await axios.post(`${baseUrl}inquiry`, data);
  return res.data;
};

const addSubscriber = async (data) => {
  const res = await axios.post(`${baseUrl}subscriber`, data);
  return res.data;
};
const addMessage = async (data) => {
  const res = await axios.post(`${baseUrl}message`, data);
  return res.data;
};

const getOrg = async () => {
  const res = await axios.get(`${baseUrl}orgpage`);
  return res.data;
};

const pageService = {
  getAllBlogs,
  getHome,
  getblog,
  getTandC,
  getPolicy,
  getAbout,
  addinquiry,
  getOrg,
  getshippinganddelivery,
  getCancellation,
  addSubscriber,
  addMessage
};

export default pageService;
