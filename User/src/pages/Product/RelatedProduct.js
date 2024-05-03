import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Product/product.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";



const RelatedProduct = ({products}) => {

    const navigate = useNavigate();

    const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        nextArrow: null,
        prevArrow: null,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
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
            <section className='related-product'>
                <Container>
                    <Row className="justify-content-center mb-3">
                        <Col lg={6} className="text-center">
                            <h3 className="product-tab-title mb-1">Related Product</h3>
                            <div className="bar"></div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={10} md={10} className="realted-product pb-5">
                            <Slider {...settings}>
                                {products?.slice(0, 6).map((product, index) => {
                                    return (
                                        
                                            <div className="product-card px-2" key={index}>
                                                <div className='product-card-thumbnail'>
                                                    <img src={imgUrl + product?.thumbnailImage} className="img-fluid" alt="img3" />
                                                </div>
                                                <div className="buy-btn" onClick={() => navigate(`/product/${product?._id}`)}>Buy Now</div>
                                                <div className="offer">{product?.percentage}% OFF</div>
                                                <div className="price-detail p-1">
                                                    <h6 className="pro-name m-0">{product?.name}</h6>
                                                    <div className="pro-price">
                                                        <p className="price m-0">&#x20B9; {product?.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    )
                                })}
                            </Slider>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default RelatedProduct