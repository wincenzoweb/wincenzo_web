import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Slider from 'react-slick'

const Brand = () => {
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        }
      }
    ]
  };
  return (
    <div className="brand-area">
      <Container className="text-center">
     
        <Slider {...settings}>
          {home?.brandImage?.map((el,index) => {

            return (

              <div className="brand" key={index}>
                <img className='brand-img' src={imgUrl + el} alt="brand-img" />
              </div>
            )
          })}
          
        </Slider>
        
      </Container>
    </div>
  );
}

export default Brand
