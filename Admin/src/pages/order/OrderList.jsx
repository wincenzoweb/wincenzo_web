import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Button from "@/components/ui/Button";
import useWidth from "@/hooks/useWidth";
import {
  deleteOrder,
  getOrders,
  toggleDetailModal,
  updateOrder,
} from "../../store/features/order/orderSlice";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  toggleModal,
  getAllAssign,
} from "../../store/features/orderAssign/assignSlice";
import { CSVLink } from 'react-csv';

const OrderList = ({ orders }) => {
  const dispatch = useDispatch();
  console.log(orders)
  useEffect(() => {
    dispatch(getAllAssign());
  }, []);

  const { assignments } = useSelector((state) => state.assign);
  const [searchQuery, setSearchQuery] = useState("");
  const { width, breakpoints } = useWidth();
  const [csvData, setCsvData] = useState([]); 
  // const [selectedRows, setSelectedRows] = useState([]);  // FOR SELECT ROW

  const calculateUserOrders = (userId) => {
    return orders.filter(order => order.user._id === userId).length;
  };

  const COLUMNS = [
    {
      Header: "Order Date",
      accessor: "createdAt",
      size: 270,
      Cell: (row) => {
        const date = dayjs(row?.cell?.value).format("DD/MM/YYYY");
        const time = dayjs(row?.cell?.value).format("h:mm A");
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small>
              <ul className="">
                <li>{date}</li>
                <li>{time}</li>
              </ul>
            </small>
          </div>
        );
      },

    },
    {
      Header: "Order ID",
      accessor: "_id",
      Cell: (row) => {
        return (
          <div className="flex font-medium text-sm leading-4 whitespace-nowrap break-word">
            <small>
              {row?.cell?.value}
            </small>

          </div>
        );
      },

    },
    {
      Header: "Product Detail",
      accessor: "products",
      Cell: (row) => {
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small className="border-b">Total Product : {row?.cell?.value?.length}</small>
            {row?.cell?.value.map((item, index) => (
              <div key={index} className="border-b">
                <small>
                  <ul className="">
                    <li>Name : {item?.product?.name}</li>
                    <li>Price : &#x20B9; {item?.product?.price}</li>
                    <li>Quantity : {item.quantity}</li>
                  </ul>
                </small>
              </div>
            ))}
          </div>

        );
      },
    },
    {
      Header: "Customer Detail",
      accessor: "user",
      // accessor: (row) => {
      //   // Check if user's role is "user"
      //   return row.user.role === "user" ? row.user.username : row.name;
      // },
      Cell: (row) => {
        const { username, email, phoneNumber } = row?.cell?.value;
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small>
              <ul className="">
                <li>Name : {username}</li>
                <li>Email : {email}</li>
                <li>Mobile : <span className="text-blue-500">{phoneNumber}</span></li>
              </ul>
            </small>
          </div>
        );
      },
    },
    {
      Header: "User All Order",
      accessor: (row) => calculateUserOrders(row.user._id),
      Cell: (row) => {
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            {row?.cell?.value}
          </div>
        );
      },
    },
    {
      Header: "Payment",
      accessor: (row) => {
        return { paymentMethod: row.paymentMethod, total: row.total };
      },
      Cell: (row) => {
        const { paymentMethod, total } = row.value;

        const paymentMethodPill = paymentMethod === "Cash on Delivery" ? "COD" : "ONLINE";
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small>
              <ul className="">
                <li>Order Amount :  &#x20B9; {total}</li>
                {/* <li>Shipping Charge : {total}</li>
                <li>Discount : {total}</li> */}
                <li>Total Amount :  &#x20B9; {total}</li>
                <li className="rounded-md bg-green-500 w-fit p-0.5 px-1">{paymentMethodPill}</li>
              </ul>
            </small>
          </div>
        );
      },
    },
    {
      Header: "Customer Address",
      accessor: "shippingAddress",
      Cell: (row) => {
        const { address, city, country, state, zipCode } = row.value;
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small>
              <ul>
                <li>{address}</li>
                <li>{city}-{zipCode}</li>
                <li>{state}</li>
                <li>{country}</li>
              </ul>
            </small>
          </div>
        );
      },
    },
    {
      Header: "Shipping Detail",
      accessor: (row) => {
        return { shippingAddress: row.shippingAddress };

      },
      Cell: (row) => {
        const { city } = row.value.shippingAddress;
        const isSurat = city.toLowerCase() === "surat";
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small>
              <ul>
                <li className={isSurat
                  ? "rounded-md border-solid border-2 border-green-500 text-green-500 bg-green-100 w-fit p-0.5 px-1"
                  : "rounded-md border-solid border-2 border-balck text-white bg-gray-500 w-fit p-0.5 px-1"}>{city}</li>
              </ul>
            </small>
          </div>
        );
      },
    },

    {
      Header: "status",
      accessor: "status",
      Cell: (row) => {
        return (
          <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
            <small
              className={`inline-block px-1 min-w-[80px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row?.cell?.value === "pending"
                ? "text-yellow-500 bg-yellow-500"
                : row?.cell?.value === "processing"
                  ? "text-primary-500 bg-primary-500"
                  : (row?.cell?.value === "shipped" ||
                    row?.cell?.value === "delivered" ||
                    row?.cell?.value === "accepted" ||
                    row?.cell?.value === "self buy")
                    ? "text-success-500 bg-success-500"
                    : (row?.cell?.value === "canceled" ||
                      row?.cell?.value === "return" ||
                      row?.cell?.value === "rejected")
                      ? "text-danger-500 bg-danger-500"
                      : ""
                }`}
            >
              {row?.cell?.value}
            </small>
          </div>
        );
      },
    },

    {
      Header: "action",
      accessor: "action",

      Cell: ({ row }) => (
        <div className="flex flex-col items-center justify-center gap-y-2">
          <span
            className="text-md hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 cursor-pointer rounded-md p-0.5 px-1"
            onClick={() => actions[0].doit(row.original)}
            title="Assign"
          >
            <Icon icon={actions[0].icon} />
          </span>
          <span
            className="text-md hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 cursor-pointer rounded-md p-0.5 px-1"
            onClick={() => actions[1].doit(row.original)}
            title="View"
          >
            <Icon icon={actions[1].icon} />
          </span>
          <span
            className="text-md hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 cursor-pointer rounded-md p-0.5 px-1"
            onClick={() => actions[2].doit(row.original)}
            title="Edit"
          >
            <Icon icon={actions[2].icon} />
          </span>
          <span
            className="text-md bg-danger-500 text-danger-500 dark:text-white bg-opacity-30 hover:bg-opacity-100 hover:text-white cursor-pointer rounded-md p-0.5 px-1"
            onClick={() => actions[3].doit(row.original)}
            title="Delete"
          >
            <Icon icon={actions[3].icon} />
          </span>
        </div>
      ),
    },
  ];
  const actions = [
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
      name: "edit",
      icon: "heroicons:pencil",
      doit: (item) => dispatch(updateOrder(item)),
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
  // const data = useMemo(() => orders, [orders]);
  const filteredOrders = useMemo(() => {
    if (!searchQuery) {
      return orders; // Return original data if search query is empty
    }

    const phoneNumberToString = (phoneNumber) => {
      // Convert phoneNumber to string
      return phoneNumber.toString();
    };

    return orders.filter((order) => {
      // Filter data based on search query

      return (
        dayjs(order.createdAt).format("DD/MM/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.some(
          (product) =>
            product.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.product.price.toString().includes(searchQuery) ||
            product.quantity.toString().includes(searchQuery)
        ) ||
        order.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof order.user.phoneNumber === 'number' && phoneNumberToString(order.user.phoneNumber).includes(searchQuery)) || // Convert phoneNumber to string
        order.total.toString().includes(searchQuery) ||
        order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [orders, searchQuery]);





  const handleExport = () => {
    const dataToExport = filteredOrders.map(order => {
      const productDetails = order.products.map((item, index) => ({
        'Product Name': item.product.name,
        'Price': `₹${item.product.price}`,
        'Quantity': item.quantity
      }));

      return {
        'Order Date': dayjs(order.createdAt).format('DD/MM/YYYY'),
        'Order ID': order._id,
        ...Object.assign({}, ...productDetails), // Spread and merge individual product details
        'Customer Name': order.user.username,
        'Customer Email': order.user.email,
        'Customer Phone Number': order.user.phoneNumber,
        'Total Amount': `₹${order.total}`,
        'User All Order': calculateUserOrders(order.user._id),
        'Payment Method': order.paymentMethod,
        'Customer Address': `${order.shippingAddress.address}, ${order.shippingAddress.city}-${order.shippingAddress.zipCode}, ${order.shippingAddress.state}, ${order.shippingAddress.country}`,
        'Shipping Detail': order.shippingAddress.city,
        'Status': order.status
      };
    });

    setCsvData(dataToExport);
  };


  const tableInstance = useTable(
    {
      columns,
      
      data: filteredOrders,
    },


    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect, 
      // FOR SELECT ROW
    // hooks => {
    //   hooks.visibleColumns.push(columns => [
    //     {
    //       id: 'selection',
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
    //       ),
    //       Cell: ({ row }) => (
    //         <input type="checkbox" {...row.getToggleRowSelectedProps()} />
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
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
    // selectedFlatRows, FOR SELECT ROW
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  // FOR SELECT ROW
  // useEffect(() => {
  //   // Update selected rows when selection changes
  //   setSelectedRows(selectedFlatRows.map(row => row.original));
  // }, [selectedFlatRows]);
  return (
    <>
      <Card noborder>
        <div className="flex justify-between items-center mb-6">
          <h4 className="card-title">Order List</h4>
          <div className={`${width < breakpoints.md ? "space-x-rb" : ""
            } flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}>

            <CSVLink
              data={csvData}
              filename={"orders.csv"}
              className="btn btn-dark dark:bg-slate-700 h-min text-sm font-normal"
              target="_blank"
              onClick={handleExport}
            >
              <div className="flex items-center">
                <Icon className="text-lg md:me-2" icon="heroicons-outline:archive-box-arrow-down" />
                <span className="hidden md:inline-block">Download CSV</span>
              </div>
            </CSVLink>


            <GlobalFilter filter={searchQuery} setFilter={setSearchQuery} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
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
                          className="table-th"

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
                  {page.map((row, index) => {
                    prepareRow(row);

                    return (
                      <tr
                        {...row.getRowProps()}

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
            {pageOptions.map((page, pageIdx) => {
              if (
                pageIdx === 0 ||
                pageIdx === pageCount - 1 ||
                (pageIdx >= pageIndex - 1 && pageIdx <= pageIndex + 1)
              ) {
                return (
                  <li key={pageIdx}>
                    <button
                      href="#"
                      aria-current="page"
                      className={` ${pageIdx === pageIndex
                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-medium  "
                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                      onClick={() => gotoPage(pageIdx)}
                    >
                      {page + 1}
                    </button>
                  </li>
                );
              } else if (
                (pageIdx === pageIndex - 2 && pageIndex > 2) ||
                (pageIdx === pageIndex + 2 && pageIndex < pageCount - 3)
              ) {
                return <li key={pageIdx}>...</li>;
              }
              return null;
            })}
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

export default OrderList;
