import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DropZone from "../forms/file-input/DropZone";
import FormGroup from "@/components/ui/FormGroup";

import {
  editUser,
  getUsers,
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
  console.log(editItem)
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
      dispatch(getUsers("user"));
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit User"
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
        <div className={`fromGroup  ${errors.shippingAddress?.address ? "has-error" : ""}`}>
          <FormGroup error={errors.shippingAddress?.address}>
            <label className="form-label" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              defaultValue={editItem?.shippingAddress?.address}
              id="address"
              className="form-control py-2"
              {...register("shippingAddress.address")}
            />
          </FormGroup>
          {errors?.shippingAddress?.address && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.shippingAddress?.address?.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">

          <div className={`fromGroup  ${errors?.shippingAddress?.city ? "has-error" : ""}`}>
            <FormGroup error={errors?.shippingAddress?.city}>
              <label className="form-label" htmlFor="city">
                City
              </label>
              <input
                type="text"
                defaultValue={editItem?.shippingAddress?.city}
                id="city"
                className="form-control py-2"
                {...register("shippingAddress.city")}
              />
            </FormGroup>
            {errors?.shippingAddress?.city && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors?.shippingAddress?.city?.message}
              </div>
            )}
          </div>


          <div className={`fromGroup  ${errors?.shippingAddress?.state ? "has-error" : ""}`}>
            <FormGroup error={errors?.shippingAddress?.state}>
              <label className="form-label" htmlFor="state">
                State
              </label>
              <input
                type="text"
                defaultValue={editItem?.shippingAddress?.state}
                id="state"
                className="form-control py-2"
                {...register("shippingAddress.state")}
              />
            </FormGroup>
            {errors?.shippingAddress?.state && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors?.shippingAddress?.state?.message}
              </div>
            )}
          </div>


          <div className={`fromGroup  ${errors?.shippingAddress?.zipCode ? "has-error" : ""}`}>
            <FormGroup error={errors?.shippingAddress?.zipCode}>
              <label className="form-label" htmlFor="zipCode">
                Pincode
              </label>
              <input
                type="text"
                defaultValue={editItem?.shippingAddress?.zipCode}
                id="zipCode"
                className="form-control py-2"
                {...register("shippingAddress.zipCode")}
              />
            </FormGroup>
            {errors?.shippingAddress?.zipCode.zipCode && (
              <div className="mt-2 text-danger-500 block text-sm">
                {errors?.shippingAddress?.zipCode?.message}
              </div>
            )}
          </div>
        </div>
        <div className={`fromGroup  ${errors?.shippingAddress?.country ? "has-error" : ""}`}>
          <FormGroup error={errors?.shippingAddress?.country}>
            <label className="form-label" htmlFor="Country">
              Country
            </label>
            <input
              type="text"
              defaultValue={editItem?.shippingAddress?.country}
              id="Country"
              className="form-control py-2"
              {...register("shippingAddress.country")}
            />
          </FormGroup>
          {errors?.shippingAddress?.country && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.shippingAddress?.country?.shippingAddress.country}
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
