import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addshippinganddelivery, getshippinganddelivery, openAddModal } from "../../../store/features/cms";
// import { addShippingAndDelivery, getShippingAndDelivery, openAddModal } from "../../../store/features/cms";

const FormValidationSchema = yup
  .object({
    description: yup.string().required("Description is required"),
  })
  .required();

const AddShippingAndDelivery = () => {
  const { addModal } = useSelector((state) => state.page);
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
    console.log(data);
    dispatch(addshippinganddelivery(data));

    setTimeout(() => {
      dispatch(getshippinganddelivery());
      dispatch(openAddModal(false));
      reset();
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Add Shipping And Delivery"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textarea
            name={"description"}
            label="Description"
            placeholder="Description"
            register={register}
            error={errors.description}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddShippingAndDelivery;
