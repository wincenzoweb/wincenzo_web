import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Product/product.css";
import Slider from "react-slick";
import OffCanvasCart from "../Cart/OffCanvasCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addReview, getProduct, getProducts } from "../../features/product/productSlice";
import ReactStars from "react-stars";
import { addCart, editCart, getCart } from "../../features/cart/cartSlice";
import toast from "react-hot-toast";
import { addWishlist } from "../../features/auth/authSlice";
import RelatedProduct from "./RelatedProduct";
import ReactImageMagnify from "react-image-magnify";
import ProductPagination from "../../components/Pagination/Pagination";


export default function SingleProduct() {

  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { product, products } = useSelector((state) => state?.product);
  const { user } = useSelector((state) => state?.auth);
  const { cart } = useSelector((state) => state?.cart);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const ratings = product?.ratings || []; // If product is null, default to an empty array
  const totalPages = Math.ceil(ratings.length / pageSize);
  const paginatedRatings = ratings.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [mainImage, setMainImage] = useState(imgUrl + product?.thumbnailImage)
  const handelMainImage = (el) => {
    setMainImage(el)
  }

  useEffect(() => {
    setMainImage(imgUrl + product?.thumbnailImage);
  }, [product, imgUrl]);

  const existCart = cart?.filter((el) => {
    return el?.productId?._id === product._id;
  });


  useEffect(() => {
    dispatch(getProducts());
    if (params?.id) dispatch(getProduct(params?.id));
    if (user?._id) dispatch(getCart(user?._id));

  }, [dispatch, params?.id, user?._id]);

  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const handleAddCart = () => {
    if (user === null) {
      toast.error("Please login to access the cart");
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } else {
      if (existCart?.length > 0) {
        dispatch(
          editCart({
            quantity: quantity,
            id: existCart[0]?._id,
          })
        );
        setTimeout(() => {
          dispatch(getCart(user?._id));
        }, 500);
      } else {
        const data = {
          userId: user?._id,
          productId: product?._id,
          price: product?.price,
          quantity: quantity,
        };
        dispatch(addCart(data));
        setTimeout(() => {
          dispatch(getCart(user?._id));
        }, 500);
      }

      setTimeout(() => {
        setShowCart(true);
      }, 900);
    }
  };

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const handleReviewSubmit = () => {
    if (!product) {

      return;
    }
    let newReview = {
      star: reviewRating,
      comment: reviewComment,
      productId: product?._id,
    }

    user && user !== null
      ? dispatch(addReview(newReview))
      : navigate("/login")


    setReviewRating(0);
    setReviewComment("");
  };
  const ratingChanged = (newRating) => {
    setReviewRating(newRating);
  }


  return (
    <>
      <section className="pearched-area py-5">
        <Container className="">
          <Row className="justify-content-center mb-3">
            <Col lg={6} className="text-center">
              <h3 className="product-tab-title mb-1">
                Perched Vidmate Wincenzo
              </h3>
              <div className="bar"></div>
              <p>
                There are many variations of passages of Lorem Ipsum that
                available, but the majority have fered alteration in some form,
                by injected humour.
              </p>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xl={5} lg={5} className="">
              <div className="product-wrap">
                <div className="single-product position-relative">
                  {/* <img src={product?.thumbnailImage} alt="img1" /> */}
                  {mainImage && <ReactImageMagnify {...{
                    smallImage: {
                      alt: 'productImg',
                      isFluidWidth: true,
                      src: mainImage
                    },
                    largeImage: {
                      src: mainImage,
                      width: 720,
                      height: 1000
                    },
                    enlargedImagePosition: "over",
                  }} />}
                  <div className="offer">{product?.percentage}% OFF</div>

                  {/* <img src={mainImage} alt="img1" /> */}
                </div>


                <Slider
                  className="slider2 mt-3 text-center"
                  slidesToShow={4}
                  swipeToSlide={false}
                  focusOnSelect={true}
                >
                  {product?.galleryImages?.map((el, index) => {
                    return (

                      <div className="slide-img" key={index}>
                        <img
                          src={imgUrl + el}
                          onClick={() => handelMainImage(imgUrl + el)}
                          className="img-fluid image-slide"
                          alt="img1"
                        />
                      </div>

                    );
                  })}
                </Slider>
              </div>
            </Col>
            <Col xl={6} lg={6} className="">
              <div className="product-detail-content mt-4">
                <h3 className="product-tab-title mb-1">{product?.name}</h3>
                <div className="d-flex align-items-center">

                  <s className="offer-price me-2 fw-bold">MRP: &#x20B9; {product?.offerPrice}</s>

                  <h6 className="price m-0">MRP: &#x20B9; {product?.price}</h6>
                </div>
                <div className="product-rating mb-4">
                  {/* <Totalrating count={product?.totalratings} /> */}

                  <ReactStars
                    count={5}
                    value={Number.parseInt(product?.totalratings)}
                    onChange={() => { }}
                    half={false}
                    edit={false}
                    size={24}
                    color2={"#ffd700"}
                  />
                  <small>({product?.ratings?.length} Customer Review)</small>
                </div>
                <p className="reveiw-text">
                  {product?.description?.length > 30
                    ? product?.description?.substring(0, 100) + "..."
                    : product?.description}
                </p>

                <div className="perched-info">
                  <div className="cart-plus mb-3">
                    <div className="cart-plus-minus">
                      <input type="text"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <div
                        className="dec qtybutton"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </div>
                      <div
                        className="inc qtybutton "
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn mb-3"
                    type="button"
                    onClick={() => handleAddCart()}
                  >
                    {" "}
                    ADD TO CART
                  </button>
                  <button
                    className="btn mb-3"
                    type="button"
                    onClick={() =>
                      dispatch(
                        addWishlist({
                          productId: product?._id,
                          userId: user?._id,
                        })
                      )
                    }
                  >
                    {" "}
                    ADD TO WISHLIST
                  </button>
                </div>
                <div className="product-info mb-5">
                  <h5>Product info</h5>
                  <ul className="p-0 m-0">
                    {/* <li>
                      <span>SID :</span> WK4685R
                    </li> */}
                    <li>
                      <span>CATEGORY :</span> {product?.category?.name}
                    </li>
                    {/* <li>
                      <span>VIDMATE MG :</span> 500MG
                    </li> */}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="">
            <Col lg={7} className="product-desc-wrap">
              <Tabs
                defaultActiveKey="description"
                id="product-desc"
                className="mb-4"
              >
                <Tab eventKey="description" title="Description">
                  <p className="desc-content">{product?.description}</p>
                </Tab>

                <Tab
                  eventKey="reviews"
                  title={`Reviews (${product?.ratings?.length})`}
                >
                  <div className="product-review-wrap">
                    <div className="review">
                      <div className="review-inner">
                        <div className="rating">
                          <h6 className="rating-inner">Star :</h6>
                        </div>
                        <ReactStars
                          count={5}
                          value={reviewRating}
                          onChange={ratingChanged}
                          size={18}
                          color2={"#ffd700"}
                        />
                      </div>
                      <div>
                        <h6 className="rating-inner mb-3">Add review<small className="optin">(optional)</small>:</h6>
                        <Form.Control
                          className="mb-3"
                          as="textarea"
                          placeholder="Type here..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          style={{ width: "500px", height: "100px" }}
                        />
                      </div>

                      <div className="perched-info">
                        <button
                          className="btn btn-sm mb-3"
                          type="button"
                          onClick={handleReviewSubmit}
                        >Submit</button>
                      </div>
                    </div>
                    <h5>
                      {product?.ratings?.length} Revirew for {product?.name}
                    </h5>
                    {paginatedRatings.map((el, index) => {
                      // Format createdAt date
                      const createdAtDate = new Date(el.createdAt);
                      const options = { month: 'short', day: '2-digit', year: 'numeric' };
                      const formattedCreatedAt = createdAtDate.toLocaleDateString('en-US', options);

                      return (
                        <div className="single-review" key={index}>
                          <div className="review-content">
                            <div className="review-rating product-rating">
                              <div className="review-meta">
                                <h6 className="mb-0">
                                  {el?.username}
                                  <small>({formattedCreatedAt})</small>
                                </h6>
                              </div>
                              <ul className="star mb-0">
                                <ReactStars
                                  count={5}
                                  value={Number?.parseInt(el?.star)}
                                  onChange={() => { }}
                                  half={false}
                                  edit={false}
                                  size={24}
                                  color2="#ffd700"
                                />
                              </ul>
                            </div>
                            <p>{el?.comment}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-4">
                      {/* Render Pagination */}
                      <ProductPagination
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalPages}
                        pageSize={pageSize}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </section>
      <RelatedProduct products={products} />
      <OffCanvasCart show={showCart} handleClose={handleCloseCart} />
    </>
  );
}
