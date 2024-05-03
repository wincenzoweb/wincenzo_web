import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { config } from "@/configs/axiosConfig";

const getAllsettings = async () => {
    const res = await axios.get(`${baseUrl}settings`,config);
    return res.data;
};

const createRazorpaySettings = async (data) => {
    const res = await axios.post(`${baseUrl}settings/razorpay`, data, config);
    return res.data;
};

const updateRazorpaySettings = async (data) => {
    const res = await axios.put(`${baseUrl}settings/razorpay`, data, config);
    return res.data;
};

const createTwilioSettings = async (data) => {
    const res = await axios.post(`${baseUrl}settings/twilio`, data, config);
    return res.data;
};

const updateTwilioSettings = async (data) => {
    const res = await axios.put(`${baseUrl}settings/twilio`, data, config);
    return res.data;
};

const createGoogleAnalyticsSettings = async (data) => {
    const res = await axios.post(`${baseUrl}settings/google-analytics`, data, config);
    return res.data;
};

const updateGoogleAnalyticsSettings = async (data) => {
    const res = await axios.put(`${baseUrl}settings/google-analytics`, data, config);
    return res.data;
};

const createMongoDBSettings = async (data) => {
    const res = await axios.post(`${baseUrl}settings/mongodb`, data, config);
    return res.data;
};

const updateMongoDBSettings = async (data) => {
    const res = await axios.put(`${baseUrl}settings/mongodb`, data, config);
    return res.data;
};

const settingService = {
    getAllsettings,
    createRazorpaySettings,
    createTwilioSettings,
    createGoogleAnalyticsSettings,
    createMongoDBSettings,
    updateRazorpaySettings,
    updateTwilioSettings,
    updateGoogleAnalyticsSettings,
    updateMongoDBSettings
}

export default settingService;
