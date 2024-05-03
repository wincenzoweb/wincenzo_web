import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import {
  deleteHome,
  getHome,
  openAddModal,
  updateData,
} from "../../../store/features/cms";

import AddHome from "./AddHome";
import EditHome from "./EditHome";
import HomeData from "./HomeData";
import { getProducts } from "../../../store/features/product/productSlice";

const HomePage = () => {
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const home = useSelector((state) => state.page?.home);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  let options = [];

  products?.forEach((element) => {
    options.push({ value: element?._id, label: element?.name });
  });

  useEffect(() => {
    dispatch(getHome());
    dispatch(getProducts());
  }, []);

  console.log(home);
  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Home
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          {home === null || home === undefined ? (
            <Button
              icon="heroicons-outline:plus"
              text="Add Home"
              className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
              iconClass=" text-lg"
              onClick={() => dispatch(openAddModal(true))}
            />
          ) : (
            <>
              <Button
                icon="heroicons:pencil-square"
                text="Edit Home"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(updateData(home))}
              />
              <Button
                icon="heroicons-outline:trash"
                text="Delete Home"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => {
                  dispatch(deleteHome(home._id));

                  setTimeout(() => {
                    dispatch(getHome());
                  }, 500);
                }}
              />
            </>
          )}
        </div>
      </div>

      {isLoaded && <TableLoading count={home?.length} />}

      {!isLoaded && (
        <div>
          <HomeData home={home} />
        </div>
      )}
      <AddHome options={options} />
      <EditHome options={options} />
    </div>
  );
};

export default HomePage;
