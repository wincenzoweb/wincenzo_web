import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormGroup from "@/components/ui/FormGroup";

import {
  editUser,
  getDeliveryboy,
  toggleEditModal,
} from "../../store/features/user/userSlice";

const FormValidationSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email is Required"),
    phoneNumber: yup.string().required("Phone Number is Required"),
  })
  .required();

const EditUser = () => {
  const { editModal, editItem } = useSelector((state) => state.user);

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

    let data2 = {
      id: editItem?._id,
      formData: data,
    };

    dispatch(editUser(data2));

    setTimeout(() => {
      dispatch(toggleEditModal(false));
      dispatch(getDeliveryboy());
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit deliveryboy"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={`fromGroup  ${errors.username ? "has-error" : ""}`}>
          <FormGroup error={errors.username}>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              defaultValue={editItem.username}
              id="username"
              className="form-control py-2"
              {...register("username")}
            />
          </FormGroup>
          {errors.username && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.username?.message}
            </div>
          )}
        </div>
        <div className={`fromGroup  ${errors.email ? "has-error" : ""}`}>
          <FormGroup error={errors.email}>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              defaultValue={editItem.email}
              id="email"
              className="form-control py-2"
              {...register("email")}
            />
          </FormGroup>
          {errors.email && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.email?.message}
            </div>
          )}
        </div>
        <div className={`fromGroup  ${errors.phoneNumber ? "has-error" : ""}`}>
          <FormGroup error={errors.phoneNumber}>
            <label className="form-label" htmlFor="email">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue={editItem.phoneNumber}
              id="phoneNumber"
              className="form-control py-2"
              {...register("phoneNumber")}
            />
          </FormGroup>
          {errors.phoneNumber && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.phoneNumber?.message}
            </div>
          )}
        </div>

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUser;
