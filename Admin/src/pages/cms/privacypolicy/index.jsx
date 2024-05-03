import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import {
  deletePolicy,
  getPolicy,
  openAddModal,
  updateData,
} from "../../../store/features/cms";
import PolicyList from "./PolicyList";
import AddPolicy from "./AddPolicy";
import EditPolicy from "./EditPolicy";

const PolicyPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const PrivacyPolicy = useSelector((state) => state.page?.PrivacyPolicy);
  const dispatch = useDispatch();
  console.log(PrivacyPolicy)

  useEffect(() => {
    dispatch(getPolicy());
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
          Privacy Policy
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {!PrivacyPolicy ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add Policy"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit Policy"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(PrivacyPolicy))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete Policy"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deletePolicy(PrivacyPolicy._id));

                  setTimeout(() => {
                    dispatch(getPolicy());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={PrivacyPolicy?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <PolicyList PrivacyPolicy={PrivacyPolicy} />
        </div>
      )}
      <AddPolicy />
      <EditPolicy />
    </div>
  );
};

export default PolicyPage;
