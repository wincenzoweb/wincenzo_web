import React, { useEffect, useState } from 'react';
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useWidth from "@/hooks/useWidth";
import * as yup from "yup";
import { getAllsettings, updateRazorpaySettings } from '../../store/features/settings/settingSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const FormValidationSchema = yup
    .object({
       
    })
    .required();

const Razorpay = () => {
    const dispatch = useDispatch();
    const { width, breakpoints } = useWidth();
    const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode

    const { settings } = useSelector(state => state?.settings);

    const razorpay = settings?.razorpay

    useEffect(() => {
        dispatch(getAllsettings());
    }, [dispatch]);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        register,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",

    });

    // Function to handle form submission
    const onSubmit = (data) => {

        dispatch(updateRazorpaySettings(data));
        setIsEditMode(false);
    };



    return (
        <>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div className="flex space-x-3 items-center rtl:space-x-reverse">
                            <div className="flex-none h-8 w-8 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-300 flex flex-col items-center justify-center text-lg">
                                <Icon icon="heroicons:credit-card" />
                            </div>
                            <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                                Razorpay Settings
                            </div>
                            <div
                                className={`${width < breakpoints.md ? "space-x-rb" : ""
                                    } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                            >
                                {!isEditMode && (
                                    <Button
                                        onClick={() => setIsEditMode(true)}
                                        icon="heroicons-outline:pencil-square"
                                        text="Edit"
                                        className="btn-sm btn-dark dark:bg-slate-700 h-min text-sm font-normal"
                                        iconClass="text-lg"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 text-sm">
                            <Textinput
                                name={"apiKey"}
                                register={register} // Pass register function as a prop
                                label="Razorpay Key ID"
                                placeholder="Razorpay key id"
                                className="mb-3"
                                disabled={!isEditMode}
                                defaultValue={razorpay?.apiKey}

                            />
                            <Textinput
                                name={"secretKey"}
                                register={register} // Pass register function as a prop
                                label="Razorpay Key Secret"
                                placeholder="Razorpay Key Secret"
                                className="mb-3"
                                disabled={!isEditMode}
                                defaultValue={razorpay?.secretKey}
                            />
                        </div>
                        {isEditMode && (
                            <div className="flex items-center justify-end">
                                <Button
                                    type="submit"
                                    text="Update"
                                    className="btn btn-sm btn-dark dark:bg-slate-700 text-center"
                                />
                            </div>
                        )}
                    </div>
                </form>
            </Card>
        </>
    );
}

export default Razorpay;
