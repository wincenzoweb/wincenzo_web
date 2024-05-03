import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DropZone from "../forms/file-input/DropZone";
import {
  closeEditModal,
  editOrder,
  getOrders,
} from "../../store/features/order/orderSlice";

const FormValidationSchema = yup
  .object({
    // name: yup.string().required("Name is required"),
    // description: yup.string().required("Description is required"),
    // tags: yup.mixed().required("Tag is required"),
  })
  .required();

const options = [
  { value: "pending", label: "pending" },
  { value: "accepted", label: "accepted" },
  { value: "rejected", label: "rejected" },
  { value: "processing", label: "processing" },
  { value: "shipped", label: "shipped" },
  { value: "delivered", label: "delivered" },
  { value: "canceled", label: "canceled" },
  { value: "return", label: "return" },
  { value: "self buy", label: "self buy" },
];
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
const EditOrder = () => {
  const { editModal, editItem } = useSelector((state) => state.order);

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
    if (data?.status?.value) data.status = data?.status?.value;

    let data2 = { id: data._id, formData: data };
    dispatch(editOrder(data2));
    setTimeout(() => {
      dispatch(closeEditModal(false));
      dispatch(getOrders());
      reset();
    }, 300);
  };

  return (
    <Modal
      title="Edit Order"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}

    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

        <div className={errors.category ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                defaultValue={{
                  value: editItem.status,
                  label: editItem.status,
                }}
                styles={styles}
                className="react-select"
                // isDisabled={
                //   editItem.status === "canceled" ||
                //   editItem.status === "delivered"
                // }
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />

          <div className="text-sm mt-2 mx-4">
            <span className="text-slate-500 dark:text-slate-300 inline-block mr-3">
              Previous status:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.status}
            </span>
          </div>
          {errors.status && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.status?.message || errors.status?.label.message}
            </div>
          )}
        </div>

        <div className={`fromGroup ${errors?.deliveryNotes ? "has-error" : ""}`}>
          <div className="relative flex flex-col">
            <label
              htmlFor={"deliveryNotes"}
              className={`capitalize flex-0 w-full my-2`}
            >
              Delivery Notes
            </label>
            <Textarea
              name={"deliveryNotes"}
              register={register}
              defaultValue={editItem?.deliveryNotes}
              placeholder="Delivery Notes"
            />
            {errors?.deliveryNotes && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2 space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {/* Display validation error message for deliveryNotes */}
          {errors?.deliveryNotes && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.deliveryNotes?.message}
            </div>
          )}
        </div>
        <div
          className={`fromGroup  ${errors?.user?.username ? "has-error" : ""}`}
        >
          <div className=" relative flex flex-col">
            <label
              htmlFor={"username"}
              className={` capitalize  flex-0  w-full my-2`}
            >
              username
            </label>
            <input
              type="text"
              defaultValue={editItem?.user?.username}
              {...register("user.username")}
              className="form-control py-2"
              id="username"
              disabled={true}
            />
            {errors?.user?.username && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors?.user?.username && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.user?.username?.message}
            </div>
          )}
        </div>


        <div
          className={`fromGroup  ${errors?.paymentMethod ? "has-error" : ""}`}
        >
          <div className=" relative flex flex-col ">
            <label
              htmlFor={"paymentMethod"}
              className={` capitalize  flex-0  w-full my-2  `}
            >
              payment Method
            </label>
            <input
              type="text"
              defaultValue={editItem?.paymentMethod}
              {...register("paymentMethod")}
              className="form-control py-2"
              id="paymentMethod"
              disabled={true}
            />
            {errors?.paymentMethod && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors?.paymentMethod && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.paymentMethod?.message}
            </div>
          )}
        </div>



        <div className={`fromGroup  ${errors?.total ? "has-error" : ""}`}>
          <div className=" relative flex flex-col ">
            <label
              htmlFor={"total"}
              className={` capitalize  flex-0  w-full my-2  `}
            >
              total amount
            </label>
            <input
              type="text"
              defaultValue={editItem?.total}
              {...register("total")}
              className="form-control py-2"
              id="total"
              disabled={true}
            />
            {errors?.total && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors?.total && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors?.total?.message}
            </div>
          )}
        </div>


        {/* <Textarea
          name={"shippingAddress.city"}
          register={register}
          label="Shipping Address"
          defaultValue={editItem?.shippingAddress?.city}
          placeholder="Shipping Address"
          disabled={true}
        /> */}
        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrder;
