import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/cms/pageSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { baseUrl } from "../../configs/baseUrl";
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import ProductPagination from "../../components/Pagination/Pagination";

const AllBlog = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Set the number of blogs per page

  const { blogs } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
  const navigate = useNavigate();

  // Logic to get blogs for the current page
  const indexOfLastBlog = currentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / pageSize);

  return (
    <div>
      <BreadCrumb heading={"All Blogs"} location={"Blogs"} />
      <div className="all-blogs">
        <Container>
          {currentBlogs.map((el) => {
            const blogUrl = `${baseUrl}/blog/${el?._id}`;
            return (
              <div className="blog" key={el?._id}>
                <div className="blog-wraper">
                  <div className="blog-image-wraper">
                    <img
                      className="blog-image"
                      src={imgUrl + el?.image}
                      alt="blog-img"
                    />
                  </div>
                  <div className="single-blog-text">
                    <h3 className="main-title">{el?.title}</h3>
                    <p className="blog-content">{el?.description}</p>
                  </div>
                  <div className="blog-thumbs">
                    <p className="blog-date">
                      <i className="bi bi-clock"></i>{" "}
                      {dayjs(el?.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <h5
                      className="more-content"
                      onClick={() => navigate(`/blog/${el?._id}`)}
                    >
                      MORE READING...
                    </h5>
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
                      <PinterestShareButton url={blogUrl} >
                        <div className="pi-icon">
                          <i className="fab fa-pinterest-p"></i>
                        </div>
                      </PinterestShareButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        
          <div className="mt-4">
            <ProductPagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={totalPages}
              pageSize={pageSize}
            />
          </div>
        </Container>
      </div>
    </div >
  );
};

export default AllBlog;


