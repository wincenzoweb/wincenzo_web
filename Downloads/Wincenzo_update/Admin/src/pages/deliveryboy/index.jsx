import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import AddUser from "./AddUser";
import UserList from "./UserList";
import { getDeliveryboy,  openAddModal } from "../../store/features/user/userSlice";
import EditUser from "./EditUser";
import UserDetail from "./UserDetail";


const DeliveryboyPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const deliveryboys = useSelector((state) => state.user?.deliveryboys);

  useEffect(() => {
    dispatch(getDeliveryboy());
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
          Deliveryboy
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons-outline:plus"
            text="Add Deliveryboy"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(openAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && (
        <TableLoading count={deliveryboys?.length} />
      )}

      {filler === "list" && !isLoaded && (
        <div>
          <UserList deliveryboys={deliveryboys} />
        </div>
      )}
      <AddUser />
      <EditUser />
      <UserDetail />
    </div>
  );
};

export default DeliveryboyPage;
