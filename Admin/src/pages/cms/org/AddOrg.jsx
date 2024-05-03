import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addAbout,
  addOrg,
  getAbout,
  getOrg,
  openAddModal,
} from "../../../store/features/cms";
import Fileinput from "../../../components/ui/Fileinput";
import { getProducts } from "../../../store/features/product/productSlice";
import Select from "react-select";

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

const AddOrg = ({ options }) => {
  const { addModal } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    dispatch(addOrg(data));
    setTimeout(() => {
      dispatch(getOrg());
      dispatch(openAddModal(false));
      reset();
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Add Orgnization"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        // className="max-w-5xl"
        onClose={() => dispatch(openAddModal(false))}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 "
          enctype="multipart/form-data"
        >
          <Textinput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email..."
            register={register}
            error={errors.email}
          />{" "}
          <Textinput
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="Enter Phone Number..."
            register={register}
            error={errors.phoneNumber}
          />{" "}
          <Textinput
            name="map"
            label="map link"
            type="text"
            placeholder="Enter map link..."
            register={register}
            error={errors.map}
          />{" "}
          <Textarea
            name={"address"}
            register={register}
            label="Address"
            placeholder="Address"
          />
          <Textarea
            name={"footerDiscription"}
            register={register}
            label="Footer Discription"
            placeholder="Footer Discription"
          />
          <Textinput
            name="footerFacebookLogo"
            label="Facebook Link "
            type="text"
            placeholder="Enter Facebook Link..."
            register={register}
            error={errors.footerFacebookLogo}
          />{" "}
          <Textinput
            name="footerTwitterLogo"
            label="Twitter Link"
            type="text"
            placeholder="Enter Twitter Link..."
            register={register}
            error={errors.footerTwitterLogo}
          />{" "}
          <Textinput
            name="footerLinkedInLogo"
            label="Pinterest link"
            type="text"
            placeholder="Pinterest link..."
            register={register}
            error={errors.footerLinkedInLogo}
          />{" "}
          <Textinput
            name="footerInstagramLogo"
            label="Instagram link"
            type="text"
            placeholder="Instagram link..."
            register={register}
            error={errors.footerInstagramLogo}
          />{" "}
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddOrg;
