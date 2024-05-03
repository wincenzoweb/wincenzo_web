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
import {
  addUser,
  getUsers,
  openAddModal,
} from "../../store/features/user/userSlice";

const FormValidationSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    phoneNumber: yup.string().required("Phone Number is Required"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  })
  .required();

const AddUser = () => {
  const { addModal } = useSelector((state) => state.user);
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
    data.role = "user";

    console.log(data);

    dispatch(addUser(data));

    setTimeout(() => {
      dispatch(openAddModal(false));
      dispatch(getUsers("user"));
      reset();
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Add User"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username..."
            register={register}
            error={errors.username}
          />
          <Textinput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email..."
            register={register}
            error={errors.email}
          />
          <Textinput
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="Enter Phone Number..."
            register={register}
            error={errors.phoneNumber}
          />

          <Textinput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password..."
            register={register}
            error={errors.password}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
