import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import {
  addCategory,
  getCategories,
  openAddModal,
} from "../../store/features/category/categorySlice";
import DropZone from "../forms/file-input/DropZone";
import Fileinput from "../../components/ui/Fileinput";
import { resetImageState } from "../../store/features/image/imageSlice";

const FormValidationSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

const AddCategory = () => {
  const { addModal } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const images = useSelector((state) => state.image?.images[0]);

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    const { name, description, image } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", images ? images : "");

    dispatch(addCategory(formData));

    setTimeout(() => {
      dispatch(openAddModal(false));
      dispatch(resetImageState());
      dispatch(getCategories());
      reset();
    }, 300);
  };
  return (
    <div>
      <Modal
        title="Add Category"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="name"
            type="text"
            placeholder="Enter name..."
            register={register}
            error={errors.name}
          />

          <Textarea
            name={"description"}
            register={register}
            label="Description"
            placeholder="Description"
          />
          {/* <Card title="File upload"> */}
          <DropZone />
          {/* </Card> */}
          {/* <Fileinput register={register} name={"image"} /> */}
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategory;
