import React, { useEffect} from "react";
import { Offcanvas} from "react-bootstrap";
import "./OffCanvasCart.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCart } from "../../features/cart/cartSlice";

export default function OffCanvasCart(props) {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { cart, cartTotal } = useSelector((state) => state.cart);
  const ID = useSelector((state) => state?.auth?.user?._id);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  useEffect(() => {
    if (ID) dispatch(getCart(ID));
  }, [dispatch,ID]);

  const handleCart = () => {
    navigate("/cart");
  };

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Offcanvas
        className="p-3"
        show={props.show}
        onHide={props.handleClose}
        placement="end"
        scroll={true}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart?.length === 0 || cart?.length === undefined ? (
            <div className="mini-cart-product-area cart-empty-title py-3">
              <h5>Your cart is currently empty.</h5>
            </div>
          ) : (
            <div className="mini-cart-product-area">
              {cart?.map((el,index) => {
                return (
                  
                    <div className="mini-cart-item" key={index}>
                      <div className="mini-cart-img">
                        <img
                          className=""
                          src={imgUrl + el?.productId?.thumbnailImage}
                          alt="product-img"
                        />
                        <span className="mini-cart-item-delete" onClick={() => {
                          dispatch(deleteCartItem(el?._id));
                          setTimeout(() => {
                            dispatch(getCart(ID));
                          }, 100);
                        }}>
                          <i class="bi bi-x"></i>
                        </span>
                      </div>
                      <div className="mini-cart-info">
                        <h6>{el?.productId?.name}</h6>
                        <span className="mini-cart-quantity">
                          {el?.quantity} x Rs. {el?.productId?.price}
                        </span>
                      </div>
                    </div>
                  
                );
              })}
            </div>
          )}

          <div className="mini-cart-footer mb-3">
            <div className="mini-cart-sub-total">
              <h5>
                Subtotal:
                <span className="shopping-cart__total">Rs. {cartTotal}</span>
              </h5>
            </div>
          </div>
          <div>
            <button className="view-btn me-2" onClick={handleCart}>
              View Cart
            </button>
            <button className="check-btn" onClick={handleCheckOut}>
              CheckOut
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
