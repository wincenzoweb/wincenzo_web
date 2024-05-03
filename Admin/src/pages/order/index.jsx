import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";

import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";
import OrderList from "./OrderList";
import { getOrders, openAddModal } from "../../store/features/order/orderSlice";
import OrderAssign from "./OrderAssign";
import OrderDetails from "./OrderDetails";
import OrderInvoice from "./OrderInvoice";
import Datepicker from "react-tailwindcss-datepicker";

const OrderPage = () => {
  const [filler, setfiller] = useState("list");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);



  // const handleValueChange = (newValue) => {
  //   console.log("newValue:", newValue);
  //   setSelectedStartDate(newValue.startDate);
  //   setSelectedEndDate(newValue.endDate);

  //   // Filter orders based on selected date range
  //   const filtered = orders.filter(order => {
  //     const startDate = new Date(newValue.startDate);
  //     const endDate = new Date(newValue.endDate);
  //     const orderDate = new Date(order.createdAt);

  //     // Extract date part from orderDate
  //     const isoDateString = orderDate.toISOString();
  //     const datePart = isoDateString.split('T')[0];

  //     return orderDate >= startDate && orderDate <= endDate;
  //   });
  //   setFilteredOrders(filtered);
  // };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setSelectedStartDate(newValue.startDate);
    setSelectedEndDate(newValue.endDate);
  
    // Check if the start and end dates are the same (i.e., single date selected)
    if (newValue.startDate === newValue.endDate) {
      // Filter orders based on the selected single date
      const filtered = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        const selectedDate = new Date(newValue.startDate);
        
        // Extract date part from orderDate
        const orderDateString = orderDate.toISOString().split('T')[0];
        const selectedDateString = selectedDate.toISOString().split('T')[0];
        
        return orderDateString === selectedDateString;
      });
      setFilteredOrders(filtered);
    } else {
      // If start and end dates are different, filter based on the range
      const filtered = orders.filter(order => {
        const startDate = new Date(newValue.startDate);
        const endDate = new Date(newValue.endDate);
        const orderDate = new Date(order.createdAt);
        
        // Extract date part from orderDate
        const orderDateString = orderDate.toISOString().split('T')[0];
        
        return orderDate >= startDate && orderDate <= endDate;
      });
      setFilteredOrders(filtered);
    }
  };
  





  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          All Order
        </h4>
        <div
          className={`${width < breakpoints.md ? "space-x-rb" : ""
            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <div className="relative">
            {/* <Datepicker
              value={value}
              onChange={handleValueChange}
              showShortcuts={true}
              displayFormat={"DD/MM/YYYY"}
            /> */}
            <Datepicker
              value={{ startDate: selectedStartDate, endDate: selectedEndDate }}
              onChange={handleValueChange}
              displayFormat={"DD/MM/YYYY"}
            />
          </div>
          <Button
            icon="heroicons-outline:plus"
            text="Add Order"
            className="btn-dark dark:bg-slate-700  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(openAddModal(true))}
          />
        </div>
      </div>

      {isLoaded && filler === "list" && <TableLoading count={orders?.length} />}

      {filler === "list" && !isLoaded && (
        <div>
          <OrderList orders={filteredOrders.length ? filteredOrders : orders} />
        </div>
      )}
      <AddOrder />
      <EditOrder />
      <OrderAssign />
      <OrderDetails />

    </div>
  );
};

export default OrderPage;
