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
    deleteUser,
    getDeliveryboy,
    toggleDetailModal,
    updateData,
} from "../../store/features/user/userSlice";
import GlobalFilter from "./GlobalFilter";

const CouponList = ({ coupons  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const COLUMNS = [
        {
            Header: "Name",
            accessor: "name",
            Cell: (row) => {
                return (
                    <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
                        <div className="flex-none">
                            <div className="h-10 w-10 rounded-full text-sm bg-[#E0EAFF] dark:bg-slate-700 flex flex-col items-center justify-center font-medium -tracking-[1px]">
                                {row?.cell?.value?.charAt(0) +
                                    row?.cell?.value?.charAt(row?.cell?.value.length - 1)}
                            </div>
                        </div>
                        <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                            {row?.cell?.value?.length > 20
                                ? row?.cell?.value?.substring(0, 20) + "..."
                                : row?.cell?.value}
                        </div>
                    </div>
                );
            },
        },
        {
            Header: "Description",
            accessor: "description",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },

        {
            Header: "Code",
            accessor: "code",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },
        {
            Header: "Start Date",
            accessor: "startDate",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },
        {
            Header: "Expiration Date",
            accessor: "expirationDate",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },
        {
            Header: "Percentage",
            accessor: "percentage",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },
        {
            Header: "Author Name",
            accessor: "authorName",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
                    </div>
                );
            },
        },
        {
            Header: "Products",
            accessor: "products",
            Cell: (row) => {
                return (
                    <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                        {row?.cell?.value}
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
                            classMenuItems="right-0 w-[140px] top-[-80px] "
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
                
                  ${item.name === "delete"
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
        {
            name: "view",
            icon: "heroicons-outline:eye",
            doit: (item) => dispatch(toggleDetailModal(item)),
        },

        {
            name: "edit",
            icon: "heroicons:pencil-square",
            doit: (item) => dispatch(updateData(item)),
        },
        {
            name: "delete",
            icon: "heroicons-outline:trash",
            doit: (item) => {
                dispatch(deleteUser(item._id));

                setTimeout(() => {
                    dispatch(getDeliveryboy());
                }, 500);
            },
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => coupons, [coupons]);

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
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">Deliveryboy List</h4>
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
                                <thead className=" bg-slate-100 dark:bg-slate-700">
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
                                            <tr
                                                {...row.getRowProps()}
                                                className=" even:bg-slate-100 dark:even:bg-slate-700"
                                            >
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
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
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
                                    className={` ${pageIdx === pageIndex
                                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                        : "bg-slate-100  dark:text-slate-400 text-slate-900  font-normal "
                                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
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

export default CouponList;
