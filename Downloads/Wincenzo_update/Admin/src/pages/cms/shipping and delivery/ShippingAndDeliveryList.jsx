import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import ProgressBar from "@/components/ui/ProgressBar";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// import {
//   deleteShippingAndDelivery,
//   getShippingAndDelivery,
//   updateData,
// } from "../../../store/features/cms";

const ShippingAndDeliveryList = ({ shippingAndDelivery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Shipping And Delivery List</h4>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden px-10 ">
              {shippingAndDelivery !== null ? (
                <>
                  <div className="my-5">{shippingAndDelivery?.description}</div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    Shipping And Delivery Not Found
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ShippingAndDeliveryList;
