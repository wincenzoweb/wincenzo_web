

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProducts } from "../../features/product/productSlice";
import ProductPagination from "../../components/Pagination/Pagination"; // Importing the Pagination component
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;
export default function AllProduct() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { products, category } = useSelector((state) => state.product);
  const [key, setKey] = useState("all item");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const pageSize = 9; // Number of products per page




  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  const filteredProducts = key === "all item" ? products : products.filter(item => item.category.name === key);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  // Calculate current page's products
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <BreadCrumb heading={"All Product"} location={"Product"} />
      <section className="product-gallery py-5">
        <Container>
          <Row className="justify-content-center align-item-center">
            <Col lg={4} className="text-center">
              <h3 className="product-tab-title mb-1">Product Gallery</h3>
              <div className="bar"></div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col lg={10} md={10} sm={9} className="tabs-col">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="product-tabs mx-auto mb-4 justify-content-center"
              >
                <Tab eventKey="all item" title="All Items">
                  <Row className="product-row flex-wrap-wrap">
                    {currentProducts.map((item, index) => (
                      <Col lg={4} md={4} sm={6} className="product-col mb-1" key={index}>
                        <ProductItem item={item} navigate={navigate} />
                      </Col>
                    ))}
                  </Row>
                </Tab>
                {category.map((cat, index) => (
                  <Tab eventKey={cat.name} title={cat.name} key={index}>
                    <Row className="product-row flex-wrap-wrap">
                      {/* Apply pagination logic to filtered products */}
                      {filteredProducts
                        .filter((item) => item.category.name === cat.name)
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize) // Apply pagination
                        .map((filteredItem, index) => (
                          <Col lg={4} md={4} sm={6} className="product-col mb-1" key={index}>
                            <ProductItem item={filteredItem} navigate={navigate} />
                          </Col>
                        ))}
                    </Row>
                  </Tab>
                ))}

              </Tabs>
              <div className="mt-4">
                <ProductPagination
                  current={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  total={totalPages}
                  pageSize={pageSize}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

const ProductItem = ({ item, navigate }) => {

  return (
    <div className="img-card">
      <div className="text-center mb-2">
        <img className="product-img" src={imgUrl + item.thumbnailImage} alt={item.name} />
      </div>
      <div className="buy-btn" onClick={() => navigate(`/product/${item._id}`)}>
        Buy Now
      </div>
      <div className="offer">{item.percentage}% OFF</div>
      <div className="price-detail p-1">
        <h6 className="pro-name m-0">{item.name}</h6>
        <div className="pro-price d-flex align-items-center">
          <s className="offer-price m-0 fw-bold">&#x20B9; {item.offerPrice}</s>
          <p className="price m-0 ms-2">&#x20B9; {item.price}</p>
        </div>
      </div>
    </div>
  );
};


