import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";

import {
  closeDetailModal,
  getOrders,
  openAddModal,
  printInvoice,
  toggleDetailModal,
} from "../../store/features/order/orderSlice";
import { getAllAssign } from "../../store/features/orderAssign/assignSlice";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


import Barcode from 'react-barcode';

import { createRoot } from 'react-dom';
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";


const OrderDetails = () => {
  const dispatch = useDispatch();
  const { detailModal, orderDetail } = useSelector((state) => state.order);
  const { assignments } = useSelector((state) => state.assign);
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(getAllAssign());
  }, []);

  const data2 = assignments?.filter((el) => {
    return el?.orderId?._id === orderDetail?._id;
  });
  const data = data2[0];
  console.log(orderDetail)
  console.log(data);
  console.log(data2);
  console.log(assignments);

  let shippingAddress= orderDetail?.shippingAddress

  // const handlePrint = () => {
  //   dispatch(printInvoice(true));
  // };
  const tableRef = useRef(null);

  const handlePrint = () => {
    const doc = new jsPDF();
  
    // Calculate width and height of PDF according to A4 size (210mm x 297mm)
    const pdfWidth = 210; // Width of A4 page in mm
    const aspectRatio = tableRef.current.offsetWidth / tableRef.current.offsetHeight;
    const pdfHeight = pdfWidth / aspectRatio;
  
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Add image to PDF with calculated dimensions
      doc.addImage(imgData, "PNG", 5, 5, pdfWidth - 10, pdfHeight - 10);
  
      // Save PDF with order ID as filename
      doc.save(`${orderDetail?._id}.pdf`);
    });
  };



  return (
    <div>
      <Modal
        title=" Order Details"
        labelclassName="btn-outline-dark"
        className="max-w-5xl"
        activeModal={detailModal}
        onClose={() => dispatch(closeDetailModal(false))}
      >
        <div className="card-body">
          <div className="mb-3">
            <span className="print-icon">
              <Button
                icon="heroicons-outline:newspaper"
                text="print"
                className="btn-sm btn-primary rounded-[999px]"
                iconClass="text-lg"
                onClick={handlePrint}
              />
            </span>
          </div>
          <div className="mb-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              User Name :{" "}
              <span className="px-1">{orderDetail?.user?.role === "user" ? orderDetail?.user?.username : orderDetail?.name}</span>
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Payment Method :{" "}
              <span className="px-1">{orderDetail?.paymentMethod}</span>
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Shipping Address :{" "}
              {shippingAddress?.address ||
                shippingAddress?.city ? (
                <>
                  <span className="px-1">
                    {shippingAddress?.address}
                  </span>
                  <span className="px-1">
                    {shippingAddress?.city}
                  </span>
                  <span className="px-1">
                    {shippingAddress?.state}
                  </span>
                  <span className="px-1">
                    {shippingAddress?.country}
                  </span>
                  <span className="px-1">
                    {shippingAddress?.zipCode}
                  </span>
                </>
              ) : (
                <>
                  <span className="px-1">
                    {shippingAddress}
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="mb-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Order Status : <span className="px-1">{orderDetail?.status}</span>
            </p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Order Date :{" "}
              <span className="px-1">
                {dayjs(orderDetail?.createdAt).format("DD/MM/YYYY")}
              </span>
            </p>
          </div>

          {orderDetail?.products?.map((el) => {

            return (
              <>
                <div className="mb-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Product Name :{" "}
                    <span className="px-1">{el?.product?.name}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Product Price :{" "}
                    <span className="px-1">{el?.product?.price}</span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Product Quantity :{" "}
                    <span className="px-1">{el?.quantity}</span>
                  </p>
                </div>
                <div className="mb-3 flex-none">
                  <div className="h-[200px] w-[200px] mx-auto mt-6 rounded-md">
                    <img
                      src={baseUrl + el?.product?.thumbnailImage}
                      className=" object-contain h-full w-full block rounded-md"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Order Total Products :{" "}
            <span className="px-1">{orderDetail?.products?.length}</span>
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Order Total : <span className="px-1">{orderDetail?.total}</span>
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Order Assigned to :{" "}
            <span className="px-1">{data?.deliveryBoyId?.username}</span>
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Order Assignment Status :{" "}
            <span className="px-1">{data?.status}</span>
          </p>
        </div>
        <Invoice tableRef={tableRef} orderDetail={orderDetail} shippingAddress={shippingAddress}/>
      </Modal>
    </div>
  );
};

export default OrderDetails;



const Invoice = ({ tableRef, orderDetail,shippingAddress }) => {

  return (
    <>
      <div className="container">
        <div className="flex items-center">
          <table style={{ border: '1px solid black', color: 'black' }} className="py-4" ref={tableRef}>
            <tbody>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2 text-center " colSpan={2}>{orderDetail?.paymentMethod} : Rs. {orderDetail?.total}</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black', }} className="py-2 px-2 text-center" colSpan={2}>
                  <Barcode value={orderDetail._id} />
                </th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2 w-48" >Biller id :</th>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2" >Weight : </th>
              </tr>
              <tr >
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2">Product Name</th>
                <th style={{ border: '1px solid black', color: 'black', fontWeight: "500", fontSize: "14px" }} className="py-2 px-2">
                  {orderDetail?.products?.map((el, index) => {
                    return (
                      <p key={index}>
                        {el?.product?.name},
                      </p>
                    )
                  })}
                </th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2" colSpan={2}>TO</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2">Name</th>
                <th style={{ border: '1px solid black', color: 'black', fontWeight: "500", fontSize: "14px" }} className="py-2 px-2">{orderDetail?.user?.username}</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2">Address</th>
                <th style={{ border: '1px solid black', color: 'black', fontWeight: "500", fontSize: "14px" }} className="py-2 px-2">
                  <p>{shippingAddress?.address}</p>
                  <span className="pe-1">
                    {shippingAddress?.city},
                  </span>
                  <span className="pe-1">
                    {shippingAddress?.state},
                  </span>
                  <span className="pe-1">
                    {shippingAddress?.country}
                  </span>
                  <span className="pe-1">
                  {shippingAddress?.zipCode}
                  </span>

                </th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2" colSpan={2}>From</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2">Name</th>
                <th style={{ border: '1px solid black', color: 'black', fontWeight: "500", fontSize: "14px" }} className="py-2 px-2">Monika</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} className="py-2 px-2">Address</th>
                <th style={{ border: '1px solid black', color: 'black', fontWeight: "500", fontSize: "14px" }} className="py-2 px-2">
                  <p>Wincenzo Herbal Cure</p>
                  <p>315, 3rd Floor,Avasar Hub,<br />
                    Upon Avasar Hospital,Near JK Dhosa,<br />
                    Umara-Rangoli Chowkadi Road</p>
                  <p>Velanja</p>
                  <p>Surat-394150</p>
                  <p>Mo:+91 9510286199</p>
                </th>
              </tr>
              <tr>
                <th style={{ border: '1px solid black', color: 'black' }} colSpan={2} className="py-2 px-2 text-center">

                  <p>wincenzoherbalcure@gmail.com</p>
                </th>

              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </>
  )
}
