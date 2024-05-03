import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../Cart/Cart.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, getWishlist } from "../../features/auth/authSlice";

export default function Wishlist() {
  const { user, wishlist } = useSelector((state) => state?.auth);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) dispatch(getWishlist(user?._id));
  }, [dispatch, user]);
console.log(wishlist)
  return (
    <>
      <section className="wishlist">
        <Row className="justify-content-center sec-title g-0">
          <Col lg={12} className="text-center">
            <h1 className="m-0">Your Wishlist</h1>
          </Col>
        </Row>
        <Container>
          <Row className="justify-content-center">
            <Col lg={12} md={11} sm={6}>
              <div className="cart-table table-responsive mb-5">
                <Table className="table-striped">
                  <tbody>
                    {wishlist?.length === 0 ? (
                      <>
                        <div className="d-flex justify-content-center align-items-center w-100">
                          Your wishlist is currently empty
                        </div>
                      </>
                    ) : (
                      wishlist?.map((el) => {
                        return (
                          <>
                            <tr>
                              <td className="prod-thumbnail">
                                <img src={imgUrl + el?.product?.thumbnailImage} className="thumb" alt="imgx" />
                              </td>
                              <td className="prod-title">
                                <h6>{el?.product?.name}</h6>
                              </td>
                              <td className="prod-price">
                                <span className="amount">
                                  Rs. {el?.product?.price}
                                </span>
                              </td>
                              {/* <td className="prod-quantity cart-product-quantity">
                                <div className="cart-pls-min">
                                  <div className="min-button qtbtn">-</div>
                                  <input
                                    className="pls-min-box"
                                    value={2}
                                    type="text"
                                  />
                                  <div className="pls-button qtbtn">+</div>
                                </div>
                              </td>
                              <td className="prod-subtotal">Rs. 4,800.00</td> */}
                              <td
                                className="prod-remove"
                                onClick={() => {
                                  dispatch(deleteWishlist(el?._id));
                                  setTimeout(() => {
                                    dispatch(getWishlist(user?._id));
                                  }, 500);
                                }}
                              >
                                <i class="bi bi-x"></i>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    )}

                    
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
