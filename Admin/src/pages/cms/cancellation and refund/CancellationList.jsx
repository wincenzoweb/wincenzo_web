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

import {
  deleteCancellation,
  getCancellation,
  updateData,
} from "../../../store/features/cms";

const CancellationList = ({ cancellationAndRefund }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cancellationAndRefund)

  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Cancellation List</h4>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden px-10 ">
              {cancellationAndRefund !== null ? (
                <>
                  <div className="my-5">{cancellationAndRefund?.description}</div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    Cancellation Not Found
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

export default CancellationList;
