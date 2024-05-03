import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import {
  deleteOrg,
  getOrg,
  openAddModal,
  updateData,
} from "../../../store/features/cms";

import AddOrg from "./AddOrg";
import EditOrg from "./EditOrg";
import OrgData from "./OrgData";

const OrgPage = () => {
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const org = useSelector((state) => state.page?.org);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrg());
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, []);

  console.log("org", org);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Orgnization
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {org === null || org === undefined ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add Orgnization Data"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit Orgnization Data"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(org))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete Orgnization Data"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deleteOrg(org?._id));

                  setTimeout(() => {
                    dispatch(getOrg());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && <TableLoading count={org?.length} />}

      {!isLoaded && (
        <div>
          <OrgData ORG={org} />
        </div>
      )}
      <AddOrg />
      <EditOrg />
    </div>
  );
};

export default OrgPage;
