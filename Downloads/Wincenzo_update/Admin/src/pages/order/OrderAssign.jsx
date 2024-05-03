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
import { editOrder, getOrders } from "../../store/features/order/orderSlice";
import {
  addAssign,
  closeAssignModal,
  closeEditModal,
  editAssign,
  getAllAssign,
} from "../../store/features/orderAssign/assignSlice";
import { getDeliveryboy } from "../../store/features/user/userSlice";

const statusoptions = [
  { value: "assigned", label: "assigned" },
  { value: "picked", label: "picked" },
  { value: "delivered", label: "delivered" },
  { value: "return", label: "return" },
  { value: "rescheduled", label: "rescheduled" },
];

const FormValidationSchema = yup
  .object({
    // deliveryBoyId: yup.object().required("Delivery Boy is required"),
    // description: yup.string().required("Description is required"),
    // tags: yup.mixed().required("Tag is required"),
  })
  .required();

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
const OrderAssign = () => {
  const { assignModal, editItem, assignments } = useSelector(
    (state) => state.assign
  );
  const deliveryboys = useSelector((state) => state.user?.deliveryboys);
  let isAssigned = assignments?.filter((el) => {
    return el.orderId?._id === editItem._id;
  });
  isAssigned = isAssigned[0];

  useEffect(() => {
    dispatch(getDeliveryboy());
    dispatch(getAllAssign());
  }, []);
  let options = [];

  deliveryboys?.forEach((element) => {
    options.push({ value: element?._id, label: element.username });
  });

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

  const onSubmit = (data) => {
    const values = {
      orderId: editItem?._id,
      user: editItem?.user?._id,
      deliveryBoyId:
        (isAssigned && isAssigned !== undefined) ||
          (isAssigned && isAssigned !== null)
          ? isAssigned?.deliveryBoyId?._id
          : data?.deliveryBoyId?.value,
      status: data?.status?.value,
    };

    console.log("values", values);

    if (
      (isAssigned && isAssigned !== undefined) ||
      (isAssigned && isAssigned !== null)
    ) {




      let finaldata = {
        id: isAssigned?._id,
        formData: values,
      };

      dispatch(editAssign(finaldata));
      setTimeout(() => {
        dispatch(closeAssignModal(false));
        dispatch(getAllAssign());
        reset();
      }, 300);
    } else {
      dispatch(addAssign(values));
      setTimeout(() => {
        dispatch(closeAssignModal(false));
        dispatch(getAllAssign());
        reset();
      }, 300);
    }
  };

  return (
    <Modal
      title="Order Assignment"
      activeModal={assignModal}
      onClose={() => dispatch(closeAssignModal(false))}
    >
      <div className="text-center">
        {editItem?.status === "canceled" || editItem?.status === "delivered" ? (
          <span className="text-center-danger">
            Order already {editItem?.status}
          </span>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={errors.deliveryBoyId ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Select Delivery Boy
          </label>
          <Controller
            name="deliveryBoyId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                defaultValue={{
                  value: isAssigned?.deliveryBoyId?._id,
                  label: isAssigned?.deliveryBoyId?.username,
                }}
                styles={styles}
                className="react-select"
                isDisabled={
                  editItem.status === "canceled" ||
                  editItem.status === "delivered" ||
                  (isAssigned && isAssigned !== undefined) ||
                  (isAssigned && isAssigned !== null)
                }
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />

          {errors.deliveryBoyId && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.deliveryBoyId?.message ||
                errors.deliveryBoyId?.label.message}
            </div>
          )}
        </div>
        <div className={errors.status ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Select Delivery Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={statusoptions}
                defaultValue={{
                  value: isAssigned?.status,
                  label: isAssigned?.status,
                }}
                styles={styles}
                className="react-select"
                isDisabled={
                  editItem.status === "canceled" ||
                  editItem.status === "delivered"
                }
                classNamePrefix="select"
                id="icon_s"
              />
            )}
          />

          {errors.status && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.status?.message || errors.status?.label.message}
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
          <button
            disabled={
              editItem.status === "canceled" || editItem.status === "delivered"
            }
            className="btn btn-dark  text-center"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default OrderAssign;
