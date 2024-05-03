import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Select from "react-select";

import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  editOrg,
  getOrg,
  toggleEditModal,
} from "../../../store/features/cms";
const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};
const FormValidationSchema = yup
  .object({
    // description: yup.string().required("Description is required"),
  })
  .required();

const EditOrg = ({ options }) => {
  const { editModal, editItem } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const {
    register,
    control,
    reset,
    setValue,

    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

    mode: "all",
  });
  

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  console.log(editItem);
  const onSubmit = (data) => {


    let data2 = {
      id: editItem?._id,
      formData: data,
    };

    dispatch(editOrg(data2));

    setTimeout(() => {
      dispatch(toggleEditModal(false));
      dispatch(getOrg());
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit Orgnization"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        
        <Textinput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter email..."
          register={register}
          defaultValue={editItem?.email}
          error={errors.email}
        />{" "}
        <Textinput
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="Enter Phone Number..."
          register={register}
          defaultValue={editItem?.phoneNumber}
          error={errors.phoneNumber}
        />{" "}
        <Textinput
          name="map"
          label="map link"
          type="text"
          placeholder="Enter map link..."
          register={register}
          defaultValue={editItem?.map}
          error={errors.map}
        />{" "}
        <Textarea
          name={"address"}
          register={register}
          label="Address"
          defaultValue={editItem?.address}
          placeholder="Address"
        />
        <Textarea
          name={"footerDiscription"}
          register={register}
          label="Footer Discription"
          defaultValue={editItem?.footerDiscription}
          placeholder="Footer Discription"
        />
        <Textinput
          name="footerFacebookLogo"
          label="Facebook Link "
          type="text"
          placeholder="Enter Facebook Link..."
          register={register}
          defaultValue={editItem?.footerFacebookLogo}
          error={errors.footerFacebookLogo}
        />{" "}
        <Textinput
          name="footerTwitterLogo"
          label="Twitter Link"
          type="text"
          placeholder="Enter Twitter Link..."
          register={register}
          defaultValue={editItem?.footerTwitterLogo}
          error={errors.footerTwitterLogo}
        />{" "}
        <Textinput
          name="footerLinkedInLogo"
          label="LinkedIn link"
          type="text"
          placeholder="LinkedIn link..."
          register={register}
          error={errors.footerLinkedInLogo}
          defaultValue={editItem?.footerLinkedInLogo}
        />{" "}
        <Textinput
          name="footerInstagramLogo"
          label="Instagram link"
          type="text"
          placeholder="Instagram link..."
          register={register}
          defaultValue={editItem?.footerInstagramLogo}
          error={errors.footerInstagramLogo}
        />{" "}
        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrg;
