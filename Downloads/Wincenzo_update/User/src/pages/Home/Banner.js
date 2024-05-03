import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";


const Banner = () => {
  const { home } = useSelector((state) => state.page);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: null,
    prevArrow: null,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };
  return (
    <>
      <section className="home-baner">
        <Container fluid className="g-0">
          <Slider {...settings}>
            {home?.banerImages?.map((el, index) => (
              <div key={index}>
                <Link to={"/product"}>
                  <img className="img-fluid" src={imgUrl + el} alt="baner-thumb" />
                </Link>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
    </>
  );
};

export default Banner;

 
