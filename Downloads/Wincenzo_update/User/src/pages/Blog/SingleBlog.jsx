import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'
import { getBlog } from '../../features/cms/pageSlice'
import { Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";

import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { baseUrl } from '../../configs/baseUrl';
const SingleBlog = () => {
  const params = useParams()
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const ID = params?.id

  const dispatch = useDispatch()
  const { blog } = useSelector((state) => state.page)
  useEffect(() => {
    dispatch(getBlog(ID))
  }, [dispatch, ID])
  console.log(blog);
  const blogUrl = `${baseUrl}/blog/${blog?.ID}`;
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="blog">
              <div className="blog-wraper">
                <div className="blog-image-wraper">
                  <img
                    className="blog-image"
                    src={imgUrl + blog?.image}
                    alt="blog-img"
                  />
                </div>
                <div className="single-blog-text">
                  {/* <h6 className="sub-title">
                        <i class="bi bi-tags-fill"></i>Warehouse, Ocean Freight
                      </h6> */}
                  <h3 className="main-title">{blog?.title}</h3>
                  <p className="blog-content">{blog?.description}</p>
                </div>
                <div className="blog-thumbs">
                  <p className="blog-date">
                    <i class="bi bi-clock"></i>{" "}
                    {dayjs(blog?.createdAt).format("DD-MM-YYYY")}
                  </p>
                  {/* <h5
                    className="more-content"
                    onClick={() => navigate(`/blog/${blog?._id}`)}
                  >
                    MORE READING...
                  </h5> */}
                  <div className="socio-icon">
                    <FacebookShareButton url={blogUrl}>
                      <div className="fb-icon">
                        <i className="fab fa-facebook-f"></i>
                      </div>
                    </FacebookShareButton>
                    <TwitterShareButton url={blogUrl}>
                      <div className="tw-icon">
                        <i className="fab fa-twitter"></i>
                      </div>
                    </TwitterShareButton>
                    <PinterestShareButton url={blogUrl}>
                      <div className="pi-icon">
                        <i className="fab fa-pinterest-p"></i>
                      </div>
                    </PinterestShareButton>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SingleBlog