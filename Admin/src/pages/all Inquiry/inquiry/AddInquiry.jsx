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

import { addInquiry, getInquiry, openAddModal } from "../../../store/features/inquiry";

const FormValidationSchema = yup
  .object({
    mobile: yup.string().required("Mobile is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

const AddInquiry = () => {
  const { addModal } = useSelector((state) => state.inquiry);
  const dispatch = useDispatch();


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


    dispatch(addInquiry(data));

    setTimeout(() => {
      dispatch(openAddModal(false));
      dispatch(getInquiry());
      reset();
    }, 300);
  };
  return (
    <div>
      <Modal
        title="Add Inquiry"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="mobile"
            label="Mobile"
            type="tel"
            placeholder="Enter mobile..."
            register={register}
            error={errors.mobile}
          />

          <Textarea
            name={"description"}
            register={register}
            label="Description"
            placeholder="Description"
          />
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddInquiry;
