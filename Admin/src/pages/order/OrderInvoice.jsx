import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef } from 'react'
import Barcode from 'react-barcode';
import { useDispatch, useSelector } from 'react-redux';
import { printInvoice } from '../../store/features/order/orderSlice';

export default function OrderInvoice() {

    const dispatch = useDispatch();
    const { orderDetail } = useSelector((state) => state.order);
    const { printInvoice: shouldPrint } = useSelector((state) => state.order);


    const tableRef = useRef(null);

    useEffect(() => {
        if (shouldPrint) {
            handlePrint()
            // Implement your printing logic here
            // const tableRef = document.getElementById('invoiceTable');
            // const doc = new jsPDF();
            // html2canvas(tableRef).then((canvas) => {
            //     const imgData = canvas.toDataURL('image/png');
            //     doc.addImage(imgData, 'PNG', 10, 10, 100, 100);
            //     doc.save('invoice.pdf');
            // });
            // Reset printInvoice state after printing
            dispatch(printInvoice(false));
        }
    }, [shouldPrint, dispatch]);

    const handlePrint = () => {
        const doc = new jsPDF();
        html2canvas(tableRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            // Calculate width and height of PDF according to a4 size (210mm x 297mm)

            doc.addImage(imgData, "PNG", 10, 10, 200, 200);

            doc.save("table.pdf");
        });
    }

    return (
        <>
            <div className="container">
                <div className="flex items-center">
                    <table className="border border-black text-black py-4 px-6" id="invoiceTable" ref={tableRef}>
                        <tbody>
                            <tr>
                                <th className="border border-black text-black text-center py-2 px-2" colSpan={2}>{orderDetail?.paymentMethod} : Rs. {orderDetail?.total}</th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black text-center py-2 px-2" colSpan={2}>
                                    <Barcode value={orderDetail._id} />
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black text-center py-2 px-2" >Biller id :</th>
                                <th className="border border-black text-black text-center py-2 px-2" >Weight : </th>
                            </tr>
                            {orderDetail?.products?.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <th className="border border-black text-black py-2 px-2" colSpan={2}>{el?.product?.name}</th>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th className="border border-black text-black py-2 px-2" colSpan={2}>TO</th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black py-2 px-2">Name</th>
                                <th className="border border-black text-black py-2 px-2">{orderDetail?.user?.username}</th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black py-2 px-2">Address</th>
                                <th className="border border-black text-black py-2 px-2">
                                    <p>asdasdasd</p>
                                    <p>asdads</p>
                                    <p>asdsad</p>
                                    <p>aasdsad</p>
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black py-2 px-2" colSpan={2}>From</th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black py-2 px-2">Name</th>
                                <th className="border border-black text-black py-2 px-2">Neel Goti</th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black py-2 px-2">Address</th>
                                <th className="border border-black text-black py-2 px-2">
                                    <p>asdasdasd</p>
                                    <p>asdads</p>
                                    <p>asdsad</p>
                                    <p>aasdsad</p>
                                </th>
                            </tr>
                            <tr>
                                <th className="border border-black text-black text-center py-2 px-2" colSpan={2}>wincenzo@mail.com</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}





