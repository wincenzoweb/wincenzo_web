import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    addCoupon,
    getCoupons,
    openAddModal,
} from "../../store/features/coupon/couponSlice";

const FormValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    code: yup.string().required("Coupon code is required"),
    startDate: yup.date().required("Start date is required").nullable(),
    expirationDate: yup.date().required("Expiration date is required").nullable(),
    percentage: yup
        .number()
        .required("Percentage is required")
        .min(0, "Percentage must be greater than or equal to 0")
        .max(100, "Percentage must be less than or equal to 100"),
    authorName: yup.string().required("Author name is required"),
    products: yup.array().of(yup.string()).required("Products are required"),
}).required();

const AddCoupon = () => {
    const { addModal } = useSelector((state) => state.coupon);
    const dispatch = useDispatch();

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {
        dispatch(addCoupon(data));

        setTimeout(() => {
            dispatch(getCoupons());
            dispatch(openAddModal(false));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add Coupon"
                labelclassName="btn-outline-dark"
                activeModal={addModal}
                onClose={() => dispatch(openAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Textinput
                        name="name"
                        label="Name"
                        type="text"
                        placeholder="Enter coupon name..."
                        register={register}
                        error={errors.name}
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter coupon description..."
                        register={register}
                        error={errors.description}
                    />
                    <Textinput
                        name="code"
                        label="Coupon Code"
                        type="text"
                        placeholder="Enter coupon code..."
                        register={register}
                        error={errors.code}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Textinput
                            name="startDate"
                            label="Start Date"
                            type="date"
                            placeholder="Select start date"
                            register={register}
                            error={errors.startDate}
                        />
                        <Textinput
                            name="expirationDate"
                            label="Expiration Date"
                            type="date"
                            placeholder="Select expiration date"
                            register={register}
                            error={errors.expirationDate}
                        />
                    </div>
                    <Textinput
                        name="percentage"
                        label="Percentage"
                        type="number"
                        placeholder="Enter percentage..."
                        register={register}
                        error={errors.percentage}
                    />
                    <Textinput
                        name="authorName"
                        label="Author Name"
                        type="text"
                        placeholder="Enter author name..."
                        register={register}
                        error={errors.authorName}
                    />
                    {/* <Textinput
                        name="products"
                        label="Products"
                        type="text"
                        placeholder="Enter products..."
                        register={register}
                        error={errors.products}
                    /> */}
                    <div className="ltr:text-right rtl:text-left">
                        <button className="btn btn-dark text-center">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddCoupon;
