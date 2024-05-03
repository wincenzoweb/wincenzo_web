import React, { useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import {
  deleteAssign,
  getAllAssign,
  toggleModal,
} from "../../store/features/orderAssign/assignSlice";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";

import Icon from "@/components/ui/Icon";

import dayjs from "dayjs";
import { closeDetailModal } from "../../store/features/user/userSlice";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import {
  deleteOrder,
  getOrders,
  toggleDetailModal,
} from "../../store/features/order/orderSlice";

const UserOrderList = () => {
  const dispatch = useDispatch();
  const { detailModal, detailItem } = useSelector((state) => state.user);
  const { userOrder, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const detail = orders?.filter((el) => {
    return el?.user?._id === detailItem?._id;
  });

  return (
    <div>
      <Modal
        title=" Order Details "
        labelclassName="btn-outline-dark"
        className="max-w-5xl"
        activeModal={detailModal}
        onClose={() => dispatch(closeDetailModal(false))}
      >
        <h6 className="text-base">{detailItem?.username}</h6>
        <TableContent detail={detail} />
      </Modal>
    </div>
  );
};

export default UserOrderList;

const TableContent = ({ detail }) => {
  const dispatch = useDispatch();

  const COLUMNS = [
    {
      Header: "To",
      accessor: "user.username",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Payment Method",
      accessor: "paymentMethod",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "last update date",
      accessor: "updatedAt",
      Cell: (row) => {
        return <span>{dayjs(row?.cell?.value).format("DD/MM/YYYY")}</span>;
      },
    },
    {
      Header: "amount",
      accessor: "total",
      Cell: (row) => {
        return <span>&#x20B9; {row?.cell?.value}</span>;
      },
    },
    {
      Header: "order status",
      accessor: "status",
      Cell: (row) => {
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value !== "canceled" &&
                row?.cell?.value !== "pending"
                  ? "text-success-500 bg-success-500"
                  : ""
              }
            ${
              row?.cell?.value === "pending"
                ? "text-warning-500 bg-warning-500"
                : ""
            }
            ${
              row?.cell?.value === "canceled"
                ? "text-danger-500 bg-danger-500"
                : ""
            }
             `}
            >
              {row?.cell?.value}
            </span>
          </div>
        );
      },
    },

    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[-100%] "
              label={
                <span classNam e="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800 ">
                {actions.map((item, i) => (
                  <Menu.Item
                    key={i}
                    onClick={() => item.doit(row?.row?.original)}
                  >
                    <div
                      className={`
                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const actions = [
    // {
    //   name: "edit",
    //   icon: "heroicons:pencil-square",
    //   doit: (item) => dispatch(updateData(item)),
    // },
    {
      name: "Assign",
      icon: "heroicons:share",
      doit: (item) => dispatch(toggleModal(item)),
    },
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: (item) => dispatch(toggleDetailModal(item)),
    },

    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (item) => {
        dispatch(deleteOrder(item._id));

        setTimeout(() => {
          dispatch(getOrders());
        }, 500);
      },
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => detail, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-2">
          <p className="card-title">{detail[0]?.deliveryBoyId?.username}</p>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};
