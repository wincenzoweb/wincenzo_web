import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import {
  deleteAbout,
  getAbout,
  openAddModal,
  updateData,
} from "../../../store/features/cms";

import AboutData from "./AboutData";
import AddAbout from "./AddAbout";
import EditAbout from "./EditAbout";
import { getProducts } from "../../../store/features/product/productSlice";

const AboutPage = () => {
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const about = useSelector((state) => state.page?.about);
  const dispatch = useDispatch();

    const { products } = useSelector((state) => state.product);
    let options = [];

    products?.forEach((element) => {
      options.push({ value: element?._id, label: element?.name });
    });
  useEffect(() => {
    dispatch(getAbout());
        dispatch(getProducts());

  }, []);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, []);

  console.log("about", about);
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          About
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {about === null || about === undefined ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add About"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit About"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(about))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete About"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deleteAbout(about?._id));

                  setTimeout(() => {
                    dispatch(getAbout());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && <TableLoading count={about?.length} />}

      {!isLoaded && (
        <div>
          <AboutData about={about} />
        </div>
      )}
      <AddAbout options={options} />
      <EditAbout options={options} />
    </div>
  );
};

export default AboutPage;
