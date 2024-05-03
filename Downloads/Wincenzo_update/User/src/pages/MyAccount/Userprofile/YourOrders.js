import React, { useEffect } from "react";
import "./YourOrders.css";
import "./AccountSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { allOrders } from "../../../features/auth/authSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
// import OrderSuccessful from '../Order/OrderSuccessful'
// import { useRecoilState } from 'recoil'
// import { orderSuccessfulProvider } from '../../Providers/OrderSuccessfulProvider'

const YourOrders = () => {
  const dispatch = useDispatch();
  const { orders, user } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (user && user?._id) dispatch(allOrders(user?._id));
  }, [dispatch, user]);
  const navigate = useNavigate();
  console.log(orders);



  const data = [];

  orders?.forEach((el) => {
    data.push({
      date: dayjs(el?.createdAt).format("DD/MM/YYYY"),
      status: el?.status,
      total: el?.total,
      paymentMethod: el?.paymentMethod,
      id: el?._id,
      products: el?.products
    });
  });

  console.log(data)

  // const [selectedorderid, setselectedorderid] = useState(0);
  // const [ordersuccesscont, setordersuccesscont] = useRecoilState(orderSuccessfulProvider)
  return (
    <div className="yourorders">
      <h1 className="mainhead1">Your Orders</h1>
      {
        // ordersuccesscont && <OrderSuccessful orderid={selectedorderid} message={`Order ID: ${selectedorderid}`} />
      }
      <table className="yourorderstable">
        <thead>
          <tr>
            <th scope="col">Oder ID</th>
            <th scope="col">Date</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Order</th>
          </tr>
        </thead>

       
        <tbody>
          {data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.products.map((product, idx) => (
                  <tr key={`${index}-${idx}`}>
                    <td data-label="OrderID">{index + 1}</td>
                    {idx === 0 ? (
                      <React.Fragment>
                        <td data-label="OrderDate">{item.date}</td>
                        <td data-label="PaymentMethod">{item.paymentMethod}</td>
                        <td data-label="DeliveryStatus">
                          <div>
                            {item.status === "delivered" && <span className="greendot"></span>}
                            {item.status !== "delivered" && item.status !== "canceled" && (
                              <span className="yellowdot"></span>
                            )}
                            {item.status === "canceled" && <span className="reddot"></span>}
                            {item.status}
                          </div>
                        </td>
                        <td data-label="Total">&#x20B9;{product?.product?.price}</td>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <td data-label="OrderDate">{item.date}</td>
                        <td data-label="PaymentMethod">{item.paymentMethod}</td>
                        <td data-label="DeliveryStatus">
                          <div>
                            {item.status === "delivered" && <span className="greendot"></span>}
                            {item.status !== "delivered" && item.status !== "canceled" && (
                              <span className="yellowdot"></span>
                            )}
                            {item.status === "canceled" && <span className="reddot"></span>}
                            {item.status}
                          </div>
                        </td>
                        <td data-label="Total">&#x20B9;{product?.product?.price}</td>
                      </React.Fragment>
                    )}
                    <td>
                      <button
                        className="mainbutton1"
                        onClick={() => navigate(`/product/${product.product._id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>

        {/* <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td data-label="OrderID">{index + 1}</td>
                <td data-label="OrderDate">{item.date}</td>
                <td data-label="OrderDate">{item.paymentMethod}</td>
                <td data-label="Delivery Status">
                  <div>
                    {item.status === "delivered" && (
                      <span className="greendot"></span>
                    )}
                    {item.status !== "delivered" &&
                      (item.status !== "canceled" ? (
                        <span className="yellowdot"></span>
                      ) : (
                        ""
                      ))}
                    {item.status === "canceled" && (
                      <span className="reddot"></span>
                    )}
                    {item.status}
                  </div>
                </td>
                <td data-label="Total">&#x20B9;{item.total}</td>
                <td data-label="Order">

                  {
                    item?.products?.map((el) => {
                      return (
                        <button
                          className="mainbutton1"
                          onClick={() => navigate(`/product/${el.product._id}`)}
                        >
                          View
                        </button>

                      )
                    })
                  }
                </td>
              </tr>
            );
          })}
        </tbody> */}
      </table>
    </div>
  );
};

export default YourOrders;
