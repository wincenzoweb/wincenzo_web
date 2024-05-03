import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";


import { deleteCancellation, getCancellation, openAddModal, updateData } from "../../../store/features/cms";
import CancellationList from "./CancellationList";
import AddCancellation from "./AddCancellation";
import EditCancellation from "./EditCancellation";

const CancellationAndRefundPage = () => {
  const [filler, setFiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const cancellationAndRefund = useSelector((state) => state.page?.cancellationAndRefund);
  const dispatch = useDispatch();
  console.log(cancellationAndRefund)
  useEffect(() => {
    dispatch(getCancellation());
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
          Cancellation and Refund
        </h4>
        <div
          className={`${width < breakpoints.md ? "space-x-rb" : ""
            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {!cancellationAndRefund ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add Cancellation and Refund"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit Cancellation and Refund"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(cancellationAndRefund))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete Cancellation and Refund"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deleteCancellation(cancellationAndRefund._id));

                  setTimeout(() => {
                    dispatch(getCancellation());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={cancellationAndRefund?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <CancellationList cancellationAndRefund={cancellationAndRefund} />
        </div>
      )}
      <AddCancellation />
      <EditCancellation />
    </div>
  );
};

export default CancellationAndRefundPage;

