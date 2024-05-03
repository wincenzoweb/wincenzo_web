import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "./Cart.css";



import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, editCart, getCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, cartTotal } = useSelector((state) => state.cart);
  const ID = useSelector((state) => state.auth.user?._id);

  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  useEffect(() => {
    if (ID) dispatch(getCart(ID));
  }, [ID, dispatch]);


 
  return (
    <>
      <section className="cart">
        <Row className="justify-content-center sec-title g-0">
          <Col lg={12} className="text-center">
            <h1 className="m-0">Your Shopping Cart</h1>
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12} md={11} sm={6}>
              <div className="cart-table table-responsive mb-5">
                <Table className="table-striped">
                  <tbody>
                    {cart?.length === 0 || cart?.length === undefined ? (
                      <>
                        <div
                          className="d-flex justify-content-center align-items-center  w-100"
                          style={{ height: "200px" }}
                        >
                          <h5 className="">Your Cart Is Empty</h5>
                        </div>
                      </>
                    ) : (
                      <>
                        {cart?.map((el,index) => {
                          return (
                            
                              <tr key={index}>
                                <td className="prod-thumbnail">
                                  <img
                                    src={imgUrl + el?.productId?.thumbnailImage}
                                    className="thumb"
                                    alt="imgx"
                                  />
                                </td>
                                <td className="prod-title">
                                  <h6>{el?.productId?.name}</h6>
                                </td>
                                <td className="prod-price">
                                  <span className="amount">
                                    Rs. {el?.productId?.price}
                                  </span>
                                </td>
                                <td className="prod-quantity cart-product-quantity">
                                  <div className="cart-pls-min">
                                    <div
                                      className="min-button qtbtn"
                                      onClick={() => {
                                        dispatch(
                                          editCart({
                                            quantity: el?.quantity - 1,
                                            id: el?._id,
                                          })
                                        );
                                        setTimeout(() => {
                                          dispatch(getCart(ID));
                                        }, 500);
                                      }}
                                    >
                                      -
                                    </div>
                                    <input
                                      className="pls-min-box"
                                      value={el?.quantity}
                                      type="text"
                                      disabled={true}
                                    />
                                    <div
                                      className="pls-button qtbtn"
                                      onClick={() => {
                                        dispatch(
                                          editCart({
                                            quantity: el?.quantity + 1,
                                            id: el?._id,
                                          })
                                        );
                                        setTimeout(() => {
                                          dispatch(getCart(ID));
                                        }, 500);
                                      }}
                                    >
                                      +
                                    </div>
                                  </div>
                                </td>
                                <td className="prod-subtotal">
                                  Rs. {el?.quantity * el?.productId?.price}
                                </td>
                                <td
                                  className="prod-remove"
                                  onClick={() => {
                                    dispatch(deleteCartItem(el?._id));
                                    setTimeout(() => {
                                      dispatch(getCart(ID));
                                    }, 500);
                                  }}
                                >
                                  <i class="bi bi-x"></i>
                                </td>
                              </tr>
                            
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center flex-wrap mb-4">
            <Col lg={10} md={6} className="text-center">
              <button className="cont-btn" onClick={() => navigate('/product')}>Continue Shopping</button>
              {/* <button className="clr-btn">Clear Cart</button> */}
            </Col>
          </Row>
          <Row className="mb-5">
            <Col lg={6}>
              <div className="cart-coupan">
                <h3>Special instructions for seller</h3>
                <textarea name="note" id="note" cols="30" rows="6"></textarea>
              </div>
            </Col>
            <Col lg={6}>
              <div className="cart-total">
                <h3>Cart Total</h3>
                <table className="border table-bordered w-100">
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>Rs. {cartTotal}</td>
                    </tr>
                    {/* {cartTotal > 499 ? (
                      <tr>
                        <th>Shipping Charges</th>
                        <td>Rs. 40</td>
                      </tr>
                    ) : (
                      ""
                    )} */}

                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong>
                          {/* Rs. {cartTotal > 499 ? cartTotal + 40 : cartTotal} */}
                          Rs. {cartTotal}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout">
                  <button
                    className="checkbtn"
                    type="submit"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
