import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewVideo } from "../../features/Video/VideoSlice";
import Slider from 'react-slick'
import { Col, Container, Modal, Row } from "react-bootstrap";

const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
const Videobg = () => {

  const [showModal, setShowModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const dispatch = useDispatch()

  const { reviewVideos } = useSelector((state) => state.video)
  console.log(reviewVideos)
  useEffect(() => {
    dispatch(getReviewVideo())
  }, [dispatch]);

  const handleVideoClick = (video) => {
    setCurrentVideoUrl(video);
    console.log("first")
    setShowModal(true);

  };


  let settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
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
    // <div className='video'>
    //     <div className='play-btn'>
    //         <i class="fas fa-play" aria-hidden="true" ></i>
    //     </div>
    // </div>
    // <div className="video-area">
    //   <div className="container">
    //     <div className="video-main">
    //       <div className="video-inner">
    //         <div className="video-play">
    //           {/* <a href='https://www.youtube.com/watch?v=aCE4OlZxWk0' className='popup-video'></a> */}
    //           <a href="/" className="popup-video">
    //             <div className="play-btn">
    //               <i className="fas fa-play" aria-hidden="true"></i>
    //             </div>
    //           </a>
    //         </div>
    //         <div className="video-title">
    //           <h2>{home?.videoTitle}</h2>
    //           <p>{home?.videosDiscription}</p>
    //           <a href="/" className="btn1">
    //             more services
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="advertise-area">
      <Container className="">
        <Row className="justify-content-center align-item-center">
          <Col lg={6} className="text-center">
            <h6 className="product-tab-title mb-1">About Product</h6>
            <div className="bar"></div>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col lg={8}>
            <Slider {...settings}>
              {reviewVideos?.map((ad, index) => {
                return (
                  <Col lg={8} className="px-2" key={index} onClick={() => handleVideoClick(ad)}>
                    <div className="position-relative rounded overflow-hidden">
                      <div className="ratio ratio-16x9">
                        <video preload="none" controls controlsList="nofullscreen nodownload" poster={imgUrl + ad?.reviewVideoThumbnail} className="position-absolute w-100 h-100 object-fit-cover">
                          <source src={imgUrl + ad?.reviewVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    <h5 className="mb-0 mb-1 mt-1">{ad?.reviewVideoTitle}</h5>
                    <p>{ad?.reviewVideoDescription}</p>
                  </Col>
                );
              })}
            </Slider>
          </Col>
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

export default Videobg;


const VideoModal = ({ show, onHide, video }) => {

  if (!video) return null; // Handle case when video is not selected

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{video.reviewVideoTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <video width="100%" height="auto" controls controlsList="nodownload">
          <source src={imgUrl + video.reviewVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>{video.advertisVideoDescription}</p>
      </Modal.Body>
    </Modal>
  );
};
