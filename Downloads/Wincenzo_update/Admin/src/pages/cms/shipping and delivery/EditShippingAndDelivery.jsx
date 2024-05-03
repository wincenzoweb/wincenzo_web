import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editshippinganddelivery, getshippinganddelivery, toggleEditModal } from "../../../store/features/cms";
// import { editShippingAndDelivery, getShippingAndDelivery, toggleEditModal } from "../../../store/features/cms";

const FormValidationSchema = yup
  .object({
    description: yup.string().required("Description is required"),
  })
  .required();

const EditShippingAndDelivery = () => {
  const { editModal, editItem } = useSelector((state) => state.page);

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

    dispatch(editshippinganddelivery(data2));

    setTimeout(() => {
      dispatch(toggleEditModal(false));
      dispatch(getshippinganddelivery());
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit Shipping And Delivery"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textarea
          name={"description"}
          register={register}
          label="Description"
          defaultValue={editItem?.description}
          placeholder="Description"
        />
        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditShippingAndDelivery;
