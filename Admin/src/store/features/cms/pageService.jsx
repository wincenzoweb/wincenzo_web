import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { config } from "@/configs/axiosConfig";

//----------------------------------ShippingAndDelivery--------------------//

const getshippinganddelivery = async () => {
  const res = await axios.get(`${baseUrl}shippinganddelivery`, config);
  return res.data;
};

const addshippinganddelivery = async (data) => {
  const res = await axios.post(`${baseUrl}shippinganddelivery`, data, config);
  return res.data;
};


const deleteshippinganddelivery = async (data) => {
  const res = await axios.delete(`${baseUrl}shippinganddelivery/${data}`, config);
  return res.data;
};
const updateshippinganddelivery = async (data) => {
  const res = await axios.put(
    `${baseUrl}shippinganddelivery/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};


//----------------------------------CancellationAndRefund--------------------//

const getCancellation = async () => {
  const res = await axios.get(`${baseUrl}cancellationandrefund`, config);
  return res.data;
};

const addCancellation = async (data) => {
  const res = await axios.post(`${baseUrl}cancellationandrefund`, data, config);
  return res.data;
};


const deleteCancellation = async (data) => {
  const res = await axios.delete(`${baseUrl}cancellationandrefund/${data}`, config);
  return res.data;
};
const updateCancellation = async (data) => {
  const res = await axios.put(
    `${baseUrl}cancellationandrefund/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};

//-----------------------------------TermsAndCondition---------------------//

const getTandC = async () => {
  const res = await axios.get(`${baseUrl}conditions`, config);
  return res.data;
};

const addTandC = async (data) => {
  const res = await axios.post(`${baseUrl}conditions`, data, config);
  return res.data;
};


const deleteTandC = async (data) => {
  const res = await axios.delete(`${baseUrl}conditions/${data}`, config);
  return res.data;
};
const updateTandC = async (data) => {
  const res = await axios.put(
    `${baseUrl}conditions/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};



// ---------------------------------------Policy-------------------------//
const getPolicy = async () => {
  const res = await axios.get(`${baseUrl}policy`);
  return res.data;
};
const addPolicy = async (data) => {
  const res = await axios.post(`${baseUrl}policy`, data, config);
  return res.data;
};


const deletePolicy = async (data) => {
  const res = await axios.delete(`${baseUrl}policy/${data}`, config);
  return res.data;
};
const updatePolicy = async (data) => {
  const res = await axios.put(
    `${baseUrl}policy/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};
// ---------------------------------------About-------------------------//
const getAbout = async () => {
  const res = await axios.get(`${baseUrl}aboutpage`);
  return res.data;
};
const addAbout = async (data) => {
  const res = await axios.post(`${baseUrl}aboutpage`, data, config);
  return res.data;
};


const deleteAbout = async (data) => {
  const res = await axios.delete(`${baseUrl}aboutpage/${data}`, config);
  return res.data;
};
const updateAbout = async (data) => {
  const res = await axios.put(
    `${baseUrl}aboutpage/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};
// ---------------------------------------Home-------------------------//
const getHome = async () => {
  const res = await axios.get(`${baseUrl}homepage`);
  return res.data;
};
const addHome = async (data) => {
  const res = await axios.post(`${baseUrl}homepage`, data, config);
  return res.data;
};


const deleteHome = async (data) => {
  const res = await axios.delete(`${baseUrl}homepage/${data}`, config);
  return res.data;
};
const updateHome = async (data) => {
  console.log("homedata",data.formData)
  const res = await axios.put(
    `${baseUrl}homepage/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};
// ---------------------------------------Org-------------------------//
const getOrg = async () => {
  const res = await axios.get(`${baseUrl}orgpage`);
  return res.data;
};
const addOrg = async (data) => {
  const res = await axios.post(`${baseUrl}orgpage`, data, config);
  return res.data;
};


const deleteOrg = async (data) => {
  const res = await axios.delete(`${baseUrl}orgpage/${data}`, config);
  return res.data;
};
const updateOrg = async (data) => {
  const res = await axios.put(
    `${baseUrl}orgpage/${data?.id}`,
    data?.formData,
    config
  );
  return res.data;
};

const pageService = {
  getTandC,
  addTandC,
  deleteTandC,
  updateTandC,

  deletePolicy,
  updatePolicy,
  addPolicy,
  getPolicy,

  deleteAbout,
  updateAbout,
  addAbout,
  getAbout,


  deleteHome,
  updateHome,
  addHome,
  getHome,

  
  deleteOrg,
  updateOrg,
  addOrg,
  getOrg,

  getCancellation,
  addCancellation,
  deleteCancellation,
  updateCancellation,

  getshippinganddelivery,
  addshippinganddelivery,
  deleteshippinganddelivery,
  updateshippinganddelivery,
};

export default pageService;
