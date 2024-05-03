import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { config } from "@/configs/axiosConfig";


const getCoupons = async () => {
    const res = await axios.get(`${baseUrl}/coupons`, config);
    return res.data
}

const addCoupon = async (data) => {
    const res = await axios.post(`${baseUrl}/coupons`, data, config);
    return res.data
}

const editCoupon = async (data) => {
    const res = await axios.post(`${baseUrl}/coupons/${data?.id}`, data?.formData, config);
    return res.data
}

const deleteCoupon = async (data) => {
    const res = await axios.delete(`${baseUrl}coupons   /${data}`, config);
    return res.data;
  };

const couponService = {
    getCoupons,
    addCoupon,
    editCoupon,
    deleteCoupon
}

export default couponService;