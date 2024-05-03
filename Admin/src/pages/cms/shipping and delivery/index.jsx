import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";



import ShippingAndDeliveryList from "./ShippingAndDeliveryList";
import AddShippingAndDelivery from "./AddShippingAndDelivery";
import EditShippingAndDelivery from "./EditShippingAndDelivery";
import { deleteshippinganddelivery, getshippinganddelivery, openAddModal, updateData } from "../../../store/features/cms";

const ShippingAndDeliveryPage = () => {
    const [filler, setFiller] = useState("list");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const shippingAndDelivery = useSelector((state) => state.page?.ShippingAndDelivery);
    const dispatch = useDispatch();
    console.log(shippingAndDelivery)

    useEffect(() => {
        dispatch(getshippinganddelivery());
    }, []);

    useEffect(() => {
        setIsLoaded(true);
        setTimeout(() => {
            setIsLoaded(false);
        }, 1500);
    }, [filler]);

    return (
        <div>
            <ToastContainer />
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    Shipping and Delivery
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    {!shippingAndDelivery ? (
                        <Button
                            icon="heroicons-outline:plus"
                            text="Add Shipping and Delivery"
                            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                            iconClass=" text-lg"
                            onClick={() => dispatch(openAddModal(true))}
                        />
                    ) : (
                        <>
                            <Button
                                icon="heroicons:pencil-square"
                                text="Edit Shipping and Delivery"
                                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(updateData(shippingAndDelivery))}
                            />
                            <Button
                                icon="heroicons-outline:trash"
                                text="Delete Shipping and Delivery"
                                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => {
                                    dispatch(deleteshippinganddelivery(shippingAndDelivery._id));

                                    setTimeout(() => {
                                        dispatch(getshippinganddelivery());
                                    }, 500);
                                }}
                            />
                        </>
                    )}
                </div>
            </div>

            {isLoaded && filler === "list" && (
                <TableLoading count={shippingAndDelivery?.length} />
            )}

            {filler === "list" && !isLoaded && (
                <div>
                    <ShippingAndDeliveryList shippingAndDelivery={shippingAndDelivery} />
                </div>
            )}
            <AddShippingAndDelivery />
            <EditShippingAndDelivery />
        </div>
    );
};

export default ShippingAndDeliveryPage;
