import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import { LoginOTP, login } from "../../../store/features/auth/authSlice";
const schema = yup
  .object({
    phoneNumber: yup
      .string()

      .required("Phone Number is Required"),
  })
  .required();
const LoginFormOtpVerify = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    dispatch(LoginOTP(values));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="phoneNumber"
        placeholder="Enter your phone number"
        label="Phone Number"
        type="tel"
        register={register}
        error={errors.phoneNumber}
        className="h-[48px]"
      />

      <Textinput
        name="otpCode"
        placeholder="Enter OTP"
        label="OTP CODE"
        type="number"
        register={register}
        error={errors.otpCode}
        className="h-[48px]"
      />

      <div className="flex justify-between">
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginFormOtpVerify;
