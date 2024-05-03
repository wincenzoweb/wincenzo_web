import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import AddTanC from "./AddTanC";
import EditTandC from "./EditTandC";
import TandCList from "./TandCList";
import {
  deleteTandC,
  getTandC,
  openAddModal,
  updateData,
} from "../../../store/features/cms";

const ConditionsPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const TermsAndConditions = useSelector(
    (state) => state.page?.TermsAndConditions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTandC());
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
          Terms And Conditions
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {TermsAndConditions?.length <= 0 ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add Terms And Conditions"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit T&C"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(TermsAndConditions))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete T&C"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deleteTandC(TermsAndConditions._id));

                  setTimeout(() => {
                    dispatch(getTandC());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={TermsAndConditions?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <TandCList TermsAndConditions={TermsAndConditions} />
        </div>
      )}
      <AddTanC />
      <EditTandC />
    </div>
  );
};

export default ConditionsPage;
