import React, { useEffect } from "react";
import { Alert, Col, Container, Form, Row } from "react-bootstrap";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

import LOGO from "./wincenzo_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAllItem, getCart } from "../../features/cart/cartSlice";
import { useFormik } from "formik";
import { addOrders, allOrders } from "../../features/auth/authSlice";
import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";
import { countries, states } from "./options";

export default function Checkout() {


  const { cart, cartTotal } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.auth);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  let amount = cartTotal


  let deliveryAddress = user?.shippingAddresses


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) dispatch(getCart(user?._id));
  }, [dispatch, user._id]);

  const products = [];
  cart?.forEach((e) => {
    products?.push({
      product: e?.productId?._id,
      quantity: e?.quantity,
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: products,
      userId: user?._id,
      total: cartTotal,
      shippingAddress: {
        label: "",
        address: "",
        zipCode: "",
        country: "",
        state: "",
        city: "",
      },
      paymentMethod: "",
    },
    onSubmit: (e) => {
      console.log(e);
      const data = {
        products: e?.products,
        userId: e?.userId,
        total: e?.total,
        shippingAddress: e?.shippingAddress,
        paymentMethod: e?.paymentMethod
      };



      dispatch(addOrders(data));
      setTimeout(async () => {
        try {
          // Dispatch allOrders action to fetch updated orders
          if (user?._id) {
            await dispatch(allOrders(user?._id));
          }

          // Get array of product IDs
          const productIds = cart.map(item => item._id);

          // Dispatch deleteCart action
          await dispatch(deleteCartAllItem(productIds));

          // Reset form
          formik.resetForm();
          // Navigate to the orders page
          navigate('/yourorders');

        } catch (error) {
          console.error("Error deleting cart items or fetching orders:", error);
        }
      }, 900);
    },
  });

  //**************razorpay function for checkout***************//

  const checkoutHandler = async (e, amount) => {
    e.preventDefault()

    if (formik.values.paymentMethod === "Online Payment") {
      const { data: { key } } = await axios.get(`${baseUrl}payment/keyid`)
      const { data: { order } } = await axios.post(`${baseUrl}payment/checkout`, { amount })
      console.log(window);
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Wincenzo",
        description: "Wincenzo Online Payment",
        image: LOGO,
        order_id: order.id,
        callback_url: `${baseUrl}payment/paymentverification`,
        prefill: {
          name: user?.username,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        notes: {
          "address": "razorapy official"
        },
        theme: {
          "color": "#F99A00"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
      formik.handleSubmit();
    } else {
      // For Cash on Delivery or any other payment method, proceed with order submission
      formik.handleSubmit();
    }
  }




  return (
    <>
      <div className="checkout-section">
        <Container>
          <form className="checkout-compo">
            <Col lg={7} md={6} className="address-detail">
              <div className="delivery-add">
                <div className="mb-3">
                  <h5 className="m-0 mb-3">Select Address</h5>
                  {deliveryAddress.length > 0 ?
                    <div className="d-flex flex-column ">
                      {deliveryAddress.map((item, index) => (
                        <div key={index} className="mb-3 border border-1 rounded overflow-hidden">
                          <div className="bg-dark-subtle d-flex align-items-cente border-bottom px-2 py-1 ">
                            <Form.Check
                              type="radio"
                              id={`address${index}`}
                              name="selectedAddress"
                              value={item.address}
                              checked={formik.values.shippingAddress.address === item.address}
                              onChange={() => formik.setFieldValue("shippingAddress", item)}
                              className="me-3"
                            />
                            <Form.Group>
                              <Form.Label className="m-0" htmlFor={`address${index}`}>
                                {`Address ${index + 1}`}
                              </Form.Label>
                            </Form.Group>
                          </div>
                          <address className="m-0 px-2 py-1">
                            {item.address}, {item.city}, {item.state}, {item.country}, {item.zipCode}
                          </address>
                        </div>
                      ))}
                    </div>
                    :
                    <Alert variant="danger" className="p-0 p-1">Add a new address for the order below</Alert>
                  }
                </div>
                <div className="mb-3">
                  <h5 className="m-0 mb-3">Delivery Address</h5>

                  <div className="country-input mb-3">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={formik.handleChange("shippingAddress.country")}
                    >
                      {countries.map(country => (
                        <option key={country.value} value={country.value}>{country.label}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="name-detail mb-3 ">
                    <Row>
                      <Col lg={12} md={12} className="mb-3">
                        <Form.Control
                          className=""
                          type="text"
                          placeholder="Name"
                          onChange={formik.handleChange("shippingAddress.name")}
                          value={formik.values.shippingAddress.name}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="addr-detail mb-3">
                    <Form.Control type="text"
                      placeholder="Address"
                      onChange={formik.handleChange("shippingAddress.address")}
                      value={formik.values.shippingAddress.address}
                    />
                  </div>
                  <div className="pin-detail d-flex mb-3">
                    <Row className="flex-wrap">
                      <Col lg={4} md={6}>
                        <Form.Control
                          className="mb-3 me-3 city"
                          type="text"
                          //   name="shippingAddress.city"
                          placeholder="City"
                          onChange={formik.handleChange("shippingAddress.city")}
                          value={formik.values.shippingAddress.city}
                        />
                      </Col>
                      <Col lg={4} md={6}>
                        <Form.Select
                          aria-label="Default select example"
                          className="mb-3 me-3"
                          onChange={formik.handleChange(
                            "shippingAddress.state"
                          )}
                        >
                          {states.map(state => (
                            <option key={state.value} value={state.value}>{state.label}</option>
                          ))}

                        </Form.Select>
                      </Col>
                      <Col lg={4} md={6}>
                        <Form.Control
                          className="mb-3 pincode"
                          type="text"
                          //   name="shippingAddress.zipCode"
                          placeholder="PIN code"
                          onChange={formik.handleChange(
                            "shippingAddress.zipCode"
                          )}
                          value={formik.values.shippingAddress.zipCode}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="payment mb-4">
                    <h5 className="m-0 mb-1">Payment</h5>
                    <p className="m-0 mb-3">
                      All transactions are secure and encrypted.
                    </p>
                    <div>
                      <div className="accordion" id="paymentAccordion">
                        <div className="card">
                          <div className="card-header" id="creditCardHeader">
                            <input
                              type="radio"
                              id="Online Payment"
                              name="paymentMethod"
                              value="Online Payment"
                              checked={
                                formik.values.paymentMethod === "Online Payment"
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Online Payment"
                            >
                              Online Payment
                            </label>
                          </div>

                        </div>
                        <div className="card">
                          <div
                            className="card-header"
                            id="cashOnDeliveryHeader"
                          >
                            <input
                              type="radio"
                              id="Cash on Delivery"
                              name="paymentMethod"
                              value="Cash on Delivery"
                              checked={
                                formik.values.paymentMethod ===
                                "Cash on Delivery"
                              }
                              onChange={formik.handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="Cash on Delivery"
                            >
                              Cash on Delivery
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="complete-btn">

                    <button
                      className="comp-order-btn"
                      type="button"
                      onClick={(e) => checkoutHandler(e, amount)}
                    >Complete Order</button>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={5} md={6} sm={12} className="cart-detail">
              <div className="order-detail">
                <h5 className="m-0 mb-3">Order Summary</h5>

                <div className="m-3">
                  {cart?.map((el) => {
                    return (

                      <div
                        className="product-detail d-flex align-items-center justify-content-between mb-4"
                        key={el?._id}
                      >
                        <div className="d-flex align-items-center">
                          <div className="prod-thumb me-3">
                            <img
                              src={imgUrl + el?.productId?.thumbnailImage}
                              className=""
                              alt="thumb"
                            />
                            <div className="product-count">
                              <span>{el?.quantity}</span>
                            </div>
                          </div>
                          <div>
                            <h6 className="m-0 fw-light">
                              {el?.productId?.name}
                            </h6>
                          </div>
                        </div>
                        <div className="">
                          <span>₹ {el?.price}</span>
                        </div>
                      </div>

                    );
                  })}
                </div>
                <div className="sub-totla d-flex justify-content-between">
                  <h6 className="">Subtotal</h6>
                  <span>₹ {cartTotal}</span>
                </div>
                <div className="total d-flex justify-content-between">
                  <h5 className="">Total</h5>
                  <span>
                    <small>INR</small> ₹ {cartTotal}
                  </span>
                </div>
              </div>
            </Col>
          </form>
        </Container>
      </div>
    </>
  );
}
