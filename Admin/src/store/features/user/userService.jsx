import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { config } from "@/configs/axiosConfig";

const getUsers = async (data) => {
  const res = await axios.get(`${baseUrl}users/alluser?user=${data}`, config);
  return res.data;
};

const addUser = async (data) => {
  const res = await axios.post(`${baseUrl}users/`, data, config);
  return res.data;
};
const deleteUser = async (data) => {
  const res = await axios.delete(`${baseUrl}users/${data}`, config);
  return res.data;
};
const updateUser = async (data) => {
  const res = await axios.put(
    `${baseUrl}users/${data?.id}`,
    data?.formData,
    config
    );
    return res.data;
  };


  
const addAdmin = async (data) => {
  const res = await axios.post(
    `${baseUrl}users/admin`,
    data,
    config
    );
    return res.data;
  };

const addInitAdmin = async (data) => {
  const res = await axios.post(`${baseUrl}users/admin/init`, data);
    return res.data;
  };



  




  // ---------------------------------------Deliveryboy-------------------------//
  const getDeliveryboy = async () => {
    const res = await axios.get(`${baseUrl}users/alldeliveryboy`, config);
    return res.data;
  };
  const addDeliveryboy = async (data) => {
    const res = await axios.post(`${baseUrl}users/deliveryboy`, data, config);
    return res.data;
  };








const userService = {
  getUsers,
  getDeliveryboy,
  addDeliveryboy,
  addUser,
  deleteUser,
  updateUser,
  addAdmin,
  addInitAdmin,
};

export default userService;
