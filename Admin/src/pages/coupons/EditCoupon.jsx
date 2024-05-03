import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormGroup from "@/components/ui/FormGroup";

import {
    editCoupon,
    getCoupons,
    toggleEditModal,
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

const EditCoupon = () => {
    const { editModal, editItem } = useSelector((state) => state.coupon);
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

    useEffect(() => {
        reset(editItem);
    }, [editItem]);

    const onSubmit = (data) => {
        const editedCoupon = { id: editItem._id, formData: data };
        dispatch(editCoupon(editedCoupon));

        setTimeout(() => {
            dispatch(getCoupons());
            dispatch(toggleEditModal(false));
            reset();
        }, 500);
    };

    return (
        <Modal
            title="Edit Coupon"
            activeModal={editModal}
            onClose={() => dispatch(toggleEditModal(false))}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormGroup error={errors.name}>
                    <label className="form-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        defaultValue={editItem.name}
                        id="name"
                        className="form-control py-2"
                        {...register("name")}
                    />
                    {errors.name && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.name?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.description}>
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <Textarea
                        defaultValue={editItem.description}
                        id="description"
                        placeholder="Enter coupon description..."
                        register={register("description")}
                    />
                    {errors.description && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.description?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.code}>
                    <label className="form-label" htmlFor="code">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        defaultValue={editItem.code}
                        id="code"
                        className="form-control py-2"
                        {...register("code")}
                    />
                    {errors.code && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.code?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.startDate}>
                    <label className="form-label" htmlFor="startDate">
                        Start Date
                    </label>
                    <input
                        type="date"
                        defaultValue={editItem.startDate}
                        id="startDate"
                        className="form-control py-2"
                        {...register("startDate")}
                    />
                    {errors.startDate && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.startDate?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.expirationDate}>
                    <label className="form-label" htmlFor="expirationDate">
                        Expiration Date
                    </label>
                    <input
                        type="date"
                        defaultValue={editItem.expirationDate}
                        id="expirationDate"
                        className="form-control py-2"
                        {...register("expirationDate")}
                    />
                    {errors.expirationDate && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.expirationDate?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.percentage}>
                    <label className="form-label" htmlFor="percentage">
                        Percentage
                    </label>
                    <input
                        type="number"
                        defaultValue={editItem.percentage}
                        id="percentage"
                        className="form-control py-2"
                        {...register("percentage")}
                    />
                    {errors.percentage && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.percentage?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.authorName}>
                    <label className="form-label" htmlFor="authorName">
                        Author Name
                    </label>
                    <input
                        type="text"
                        defaultValue={editItem.authorName}
                        id="authorName"
                        className="form-control py-2"
                        {...register("authorName")}
                    />
                    {errors.authorName && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.authorName?.message}
                        </div>
                    )}
                </FormGroup>
                <FormGroup error={errors.products}>
                    <label className="form-label" htmlFor="products">
                        Products
                    </label>
                    <input
                        type="text"
                        // defaultValue={editItem.products.join(",")}
                        id="products"
                        className="form-control py-2"
                        {...register("products")}
                    />
                    {errors.products && (
                        <div className="mt-2 text-danger-500 block text-sm">
                            {errors.products?.message}
                        </div>
                    )}
                </FormGroup>
                <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center">Update</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditCoupon;
