import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPasswordVerify } from "../../../store/features/auth/authSlice";
import { useLocation, useParams } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    otp: yup.number().required("Otp is Required"),
    newPassword: yup.string().required("Password is Required"),
  })
  .required();
const ForgotPassVerify = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(forgotPasswordVerify(data));
  };
  const location = useLocation();

  const email = location?.search?.split("?")[1];
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="email"
          label="Email Address"
          type="Email Address"
          register={register}
          error={errors.email}
          defaultValue={email}
          className="h-[48px]"
          disabled={true}
        />

        <Textinput
          name="otp"
          label="OTP"
          type="number"
          register={register}
          error={errors.otp}
          className="h-[48px]"
        />
        <Textinput
          name="newPassword"
          label="New Password"
          type="password"
          register={register}
          error={errors.newPassword}
          className="h-[48px]"
        />

        <button className="btn btn-dark block w-full text-center">
          Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPassVerify;
