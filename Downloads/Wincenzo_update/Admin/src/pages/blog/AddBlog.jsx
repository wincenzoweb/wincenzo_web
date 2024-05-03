import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import DropZone from "../forms/file-input/DropZone";
import { resetImageState } from "../../store/features/image/imageSlice";
import { addBlog, getBlogs, openAddModal } from "../../store/features/blog/blogSlice";

const FormValidationSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

const AddBlog = () => {
  const { addModal } = useSelector((state) => state.blog);
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
    console.log(data);
    const { title, description } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", images ? images : "");

    dispatch(addBlog(formData));

    setTimeout(() => {
      dispatch(openAddModal(false));
      dispatch(resetImageState());
      dispatch(getBlogs());
      reset();
    }, 300);
  };
  return (
    <div>
      <Modal
        title="Add Blog"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter title..."
            register={register}
            error={errors.title}
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

export default AddBlog;
