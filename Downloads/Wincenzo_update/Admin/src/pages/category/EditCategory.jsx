import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import {
  closeEditModal,
  editCategory,
  getCategories,
} from "../../store/features/category/categorySlice";
import DropZone from "../forms/file-input/DropZone";
import { resetImageState } from "../../store/features/image/imageSlice";

const FormValidationSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    // tags: yup.mixed().required("Tag is required"),
  })
  .required();

const EditCategory = () => {
  const { editModal, editItem } = useSelector((state) => state.category);
  const images = useSelector((state) => state.image?.images[0]);
  console.log(images);

  const dispatch = useDispatch();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

    mode: "all",
  });

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    const { name, description, image } = data;
    console.log(data);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", images ? images : image);

    let data2 = {
      id: editItem?._id,
      formData: formData,
    };

    dispatch(editCategory(data2));

    setTimeout(() => {
      dispatch(closeEditModal(false));
      dispatch(resetImageState());
      dispatch(getCategories());
    }, 300);
  };

  return (
    <Modal
      title="Edit Category"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={`fromGroup  ${errors.name ? "has-error" : ""}`}>
          <div className=" relative">
            <input
              type="text"
              defaultValue={editItem.name}
              {...register("name")}
              className="form-control py-2"
            />
            {errors.name && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.name && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.name?.message}
            </div>
          )}
        </div>

        <Textarea
          name={"description"}
          register={register}
          label="Description"
          defaultValue={editItem?.description}
          placeholder="Description"
        />
        <DropZone img={editItem?.image} />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCategory;
