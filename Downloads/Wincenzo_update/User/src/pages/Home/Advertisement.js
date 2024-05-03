import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick'
import { getAdvertisementVideo } from "../../features/Video/VideoSlice";


const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
const Advertisements = () => {
   
    const { advertisementVideos } = useSelector((state) => state.video)

    const [showModal, setShowModal] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdvertisementVideo())
    }, [dispatch]);

    useEffect(() => {
        disableRightClick();
        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
        };
    }, []);

    const handleRightClick = (event) => {
        event.preventDefault();
    };

    const handleVideoClick = (video) => {
        setCurrentVideoUrl(video);
        console.log("first")
        setShowModal(true);
        disableRightClick(); 
    };

    const disableRightClick = () => {
        document.addEventListener('contextmenu', handleRightClick);
    };
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="advertise-area">
            <Container className="">
                <Row className="justify-content-center align-item-center">
                    <Col lg={6} className="text-center">
                        <h6 className="product-tab-title mb-1">Customer Feedback</h6>
                        <div className="bar"></div>
                    </Col>
                </Row>
                <Row className="justify-content-center align-item-center">
                    <Slider {...settings}>
                        {advertisementVideos?.map((ad, index) => {
                            return (
                                <Col lg={4} className="px-1" key={index} onClick={() => handleVideoClick(ad)}>
                                    <div className="position-relative rounded overflow-hidden">
                                        <div className="ratio ratio-16x9">
                                            <video preload="none" controls controlsList="nofullscreen nodownload" poster={imgUrl + ad?.advertisementVideoThumbnail} className="position-absolute w-100 h-100 object-fit-cover">
                                                <source src={imgUrl + ad?.advertisementVideoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                    <h5 className="mb-0 mb-1 mt-1">{ad?.advertisVideoTitle}</h5>
                                    <p>{ad?.advertisVideoDescription}</p>
                                </Col>
                            );
                        })}
                    </Slider>
                </Row>
            </Container>
            <VideoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                video={currentVideoUrl}
            />
        </div>
    );
};

export default Advertisements;


const VideoModal = ({ show, onHide, video }) => {

    if (!video) return null; // Handle case when video is not selected

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{video.advertisementVideoTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <video width="100%" height="auto" controls controlsList="nodownload">
                    <source src={imgUrl + video.advertisementVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <p>{video.advertisementVideoDescription}</p>
            </Modal.Body>
        </Modal>
    );
};


