import React, { useEffect, useState } from "react";
import { Col, Container, Row} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductFilter,
  getCategory,
  getProducts,
} from "../../features/product/productSlice";
import ProductPagination from "../../components/Pagination/Pagination";

export default function ProductList() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { products, category, productFilter } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  console.log(products);
  console.log(category);

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [Category, setCategory] = useState("");
  useEffect(() => {
    if (
      page !== undefined ||
      limit !== undefined ||
      Category !== undefined ||
      Category !== "" ||
      name !== undefined
    ) {
      dispatch(
        ProductFilter({
          category: Category,
          name,
          page,
          limit,
        })
      );
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, name, Category, page, limit]);

  const handleReset = () => {
    setName("");
    setPage(1);
    setLimit(9);
    setCategory("");
  };
  console.log(page);
  return (
    <>
      <section className="product-gallery py-5">
        <Container>
          <Row className="justify-content-center align-item-center">
            <Col lg={4} className="text-center">
              <h3 className="product-tab-title mb-1">Product Gallery</h3>
              <div className="bar"></div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col lg={9} md={10} sm={9} className="tabs-col">
              <Row className="product flex-wrap-wrap">
                <div className="d-flex justify-content-center product-tab nav-tabs">

                  <button className="btn nav-link" onClick={handleReset}>
                    Reset
                  </button>
                  {category?.map((el) => {
                    return (
                      <>
                        <div className="nav-item">
                          <input
                            type="radio"
                            className="btn-check"
                            name="category"
                            id={el?._id}
                            autocomplete="off"
                            value={el?._id}
                            onChange={(e) => setCategory(el?._id)}
                          />
                          <label className="btn nav-link" for={el?._id}>
                            {el?.name}
                          </label>
                        </div>
                      </>
                    );
                  })}
                </div>
                {products?.map((el) => {
                  return (
                    <>
                      <Col lg={4} md={6} sm={6} className="product-col mb-1">
                        <div className="img-card">
                          <div className="text-center mb-2">
                            <img
                              className="product-img"
                              src={el?.thumbnailImage}
                              alt={el?.name}
                            />
                          </div>
                          <div
                            className="buy-btn"
                            onClick={() => navigate(`/product/${el?._id}`)}
                          >
                            Buy Now
                          </div>
                          {/* <div className="offer">30% OFF</div> */}
                        </div>
                        <div className="price-detail p-1">
                          <h6 className="pro-name m-0">{el?.name}</h6>
                          <div className="pro-price">
                            <s className="price m-0">&#x20B9; {el?.price}</s>
                            <p className="offer-price m-0 ms-2">
                              &#x20B9; {el?.price}
                            </p>
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="mt-4">
          <ProductPagination
            current={page}
            onChange={(e) => setPage(e)}
            total={productFilter?.totalPages}
            pageSize={9}
          />
        </div>
      </section>
    </>
  );
}
