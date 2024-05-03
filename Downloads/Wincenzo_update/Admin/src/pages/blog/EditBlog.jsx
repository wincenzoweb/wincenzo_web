import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DropZone from "../forms/file-input/DropZone";
import { resetImageState } from "../../store/features/image/imageSlice";
import {
  closeEditModal,
  editBlog,
  getBlogs,
} from "../../store/features/blog/blogSlice";

const FormValidationSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

const EditBlog = () => {
  const { editModal, editItem } = useSelector((state) => state.blog);
  const images = useSelector((state) => state.image?.images[0]);

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
    console.log(data);
    const { title, description, image } = data;
    console.log(data);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", images ? images : image);

    let data2 = {
      id: editItem?._id,
      formData: formData,
    };

    dispatch(editBlog(data2));

    setTimeout(() => {
      dispatch(closeEditModal(false));
      dispatch(resetImageState());
      dispatch(getBlogs());
    }, 300);
  };

  return (
    <Modal
      title="Edit Blog"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 "
        enctype="multipart/form-data"
      >
        <div className={`fromGroup  ${errors.title ? "has-error" : ""}`}>
          <div className=" relative">
            <input
              type="text"
              defaultValue={editItem.title}
              {...register("title")}
              className="form-control py-2"
            />
            {errors.title && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.title && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.title?.message}
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

export default EditBlog;
