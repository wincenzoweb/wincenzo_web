import React, { useEffect, useState } from 'react';
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useWidth from "@/hooks/useWidth";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllsettings, updateMongoDBSettings } from '../../store/features/settings/settingSlice';

const FormValidationSchema = yup
    .object({
        // Define your validation schema here
        // baseurl: yup.string().required("Base URL is required"),
    })
    .required();

const BaseUrl = () => {
    const { width, breakpoints } = useWidth();
    const [isEditMode, setIsEditMode] = useState(false); 

    const dispatch = useDispatch();
    const {settings} = useSelector(state => state?.settings);

    const mongodb = settings?.mongodb

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
        
        dispatch(updateMongoDBSettings(data));
        setIsEditMode(false);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div className="flex space-x-3 items-center rtl:space-x-reverse">
                        <div className="flex-none h-8 w-8 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-300 flex flex-col items-center justify-center text-lg">
                            <Icon icon="fa-solid:globe" />
                        </div>
                        <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                            Base URL Settings
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
                            name={"databaseURL"}
                            register={register} // Pass register function as a prop
                            label="Base URL"
                            placeholder="Database URL"
                            className="mb-3"
                            disabled={!isEditMode}
                            defaultValue={mongodb?.databaseURL}
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
    );
}

export default BaseUrl;
