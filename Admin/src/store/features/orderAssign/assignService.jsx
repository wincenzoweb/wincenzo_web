import axios from "axios";
import { config } from "@/configs/axiosConfig";
const baseUrl = import.meta.env.VITE_BASE_URL;

const addAssign = async (data) => {
  const res = await axios.post(`${baseUrl}orderAssignments`, data, config);
  return res.data;
};
const DeleteAssign = async (data) => {
  const res = await axios.delete(`${baseUrl}orderAssignments/${data}`, config);
  return res.data;
};
const EditAssign = async (data) => {
  const res = await axios.put(
    `${baseUrl}orderAssignments/${data.id}`,
    data.formData,
    config
  );
  return res.data;
};
const AllAssign = async () => {
  const res = await axios.get(
    `${baseUrl}orderAssignments`,

    config
  );
  return res.data;
};

const assignService = {
  addAssign,
  DeleteAssign,
  EditAssign,
  AllAssign,
};

export default assignService;
