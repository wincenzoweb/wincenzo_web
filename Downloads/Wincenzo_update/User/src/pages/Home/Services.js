import React from "react";
import { useSelector } from "react-redux";
import Slider from 'react-slick'

const Services = () => {
  const { home } = useSelector((state) => state.page);
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
    nextArrow: null,
    prevArrow: null,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        }
      }
    ]
  };

  return (
    <div className="services-main shadow">
      <div className="container">
        <div className="services-inner">
          <Slider {...settings}>
            {home?.feature?.map((el, index) => (
              <div key={index} className="services-item">
                <div className="services-item-inner shadow">
                  <div className="services-icon">
                    <img className="feature-image" src={imgUrl + el?.featureImage} alt="featuresicon" />
                  </div>
                  <div className="services-text">
                    <strong>{el?.featureTitle}</strong>
                    <p>{el?.featureDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Services;
