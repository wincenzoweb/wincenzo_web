import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";;
import { closeEditModal, editInquiry, getInquiry } from "../../../store/features/inquiry";

const FormValidationSchema = yup
  .object({
    mobile: yup.string().required("Mobile is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

const EditInquiry = () => {
  const { editModal, editItem } = useSelector((state) => state.inquiry);
  const images = useSelector((state) => state.image?.images[0]);
  console.log(images);

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
    let data2 = {
      id: editItem?._id,
      formData: data,
    };

    dispatch(editInquiry(data2));

    setTimeout(() => {
      dispatch(closeEditModal(false));
      dispatch(getInquiry());
    }, 300);
  };

  return (
    <Modal
      title="Edit Inquiry"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {/* <div className={`fromGroup  ${errors.mobile ? "has-error" : ""}`}> */}
        <div className=" relative">
          <Textinput
            name={"mobile"}
            register={register}
            label="Mobile"
            defaultValue={editItem?.mobile}
            placeholder="mobile"
          />
          <Textinput
            name={"subject"}
            register={register}
            label="Subject"
            defaultValue={editItem?.subject}
            placeholder="mobile"
          />
          {/* <input
              name={"mobile"}
              label="Mobile"
              type="tel"
              defaultValue={editItem.mobile}
              {...register("mobile")}
              className="form-control py-2"
            />
            {errors.mobile && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.mobile && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.mobile?.message}
            </div>
          )} */}
        </div>

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

export default EditInquiry;
