
import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;


const getReviewVideo = async () => {

  const res = await axios.get(`${baseUrl}reviewvideo`);
  return res.data;

};

const addReviewVideo = async (data) => {

  const res = await axios.post(`${baseUrl}reviewvideo`, data, config);
  return res.data;
};

const updateReviewVideo = async (data) => {

  const res = await axios.put(`${baseUrl}reviewvideo/${data.id}`, data.formData, config);
  return res.data;

};

const deleteReviewVideo = async (data) => {

  const res = await axios.delete(`${baseUrl}reviewvideo/${data}`, config);
  return res.data;
}

const getAdvertisementVideo = async () => {

  const res = await axios.get(`${baseUrl}advertisementvideo`);
  return res.data;

};

const addAdvertisementVideo = async (data) => {

  const res = await axios.post(`${baseUrl}advertisementvideo`, data, config);
  return res.data;

};

const updateAdvertisementVideo = async (data) => {

  const res = await axios.put(`${baseUrl}advertisementvideo/${data.id}`, data.formData, config);
  return res.data;

};

const deleteAdvertisementVideo = async (data) => {

  const res = await axios.delete(`${baseUrl}advertisementvideo/${data}`, config);
  return res.data;

};



const VideoService = {
  getReviewVideo,
  addReviewVideo,
  updateReviewVideo,
  deleteReviewVideo,
  getAdvertisementVideo,
  addAdvertisementVideo,
  updateAdvertisementVideo,
  deleteAdvertisementVideo,
};

export default VideoService;
