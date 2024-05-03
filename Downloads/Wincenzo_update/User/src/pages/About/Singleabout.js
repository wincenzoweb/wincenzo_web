import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./SingleAbout.css";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../../features/cms/pageSlice";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

function Singleabout() {

  const dispatch = useDispatch();
  const { about } = useSelector((state) => state.page);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  console.log(about?.products)
  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  let certificates = about?.certificate
  let productGalleryImages = about?.products[0]?.galleryImages


  let settings = {
    dots: false, // Optionally enable dots navigation
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 800, // Set autoplay speed to 3 seconds
    speed: 3000, // Set transition speed to 1 second
    cssEase: "linear",
    prevArrow: null, // Hide previous arrow
    nextArrow: null, // Hide next arrow

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <BreadCrumb heading={"About Us"} location={"About"} />
      <div className="productpage">
        <div className="container">
          <div className="row justify-content-center">
            <Col lg={4} md={5} className="mb-3">
              <Slider {...settings} className="">
                {productGalleryImages?.map((el, index) => {
                  return (
                    <div className="prod-img px-2" key={index}>
                      <img
                        src={imgUrl + el}
                        className=""
                        alt="productImg"
                      />
                    </div>
                  );
                })}
              </Slider>
            </Col>
            <Col lg={6} md={7} className="p-4">
              <div className="sec-title">
                <h2 className="sec-head-text">
                  {about?.title}
                </h2>
                <p className="sec-sub-text">
                  {about?.description}
                </p>
              </div>
            </Col>
          </div>
        </div>
      </div>
      <Container>
        <Row className="justify-content-center align-item-center mb-3">
          <Col lg={6} className="certi-text text-center">
            <h3 className="product-tab-title mb-1">OUR CERTIFICATES</h3>
            <div className="bar"></div>
            <p>
              There are many variations of passages of Lorem Ipsum that
              available, but the majority have fered alteration in some form, by
              injected humour.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        {certificates?.map((certificate, index) => {
          const shouldSwap = index % 2 === 1;
          return (
            <>
              <Row className="" key={index}>
                <Col lg={6} className={`g-0 ${shouldSwap ? 'left-col' : 'right-col'}`}>
                  <img className="img-fluid" src={imgUrl + certificate?.certificateImage} alt="blog-img" />
                </Col>
                <Col lg={6} className={`g-0 ${shouldSwap ? 'right-col' : 'left-col'}`}>
                  <div className="certi-content p-5">
                    <h5 className="certi-title">{certificate?.certificateSmallTitle}</h5>
                    <h2 className="certi-text">{certificate?.certificateTitle}</h2>
                    <div className="bot-line"></div>
                    <p className="certi-sub-text">
                      {certificate?.certificateDescription}
                    </p>
                  </div>
                </Col>
              </Row>
            </>
          )
        })}
      </Container>
    </>
  );
}
export default Singleabout;
