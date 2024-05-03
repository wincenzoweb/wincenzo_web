// import React, { useState, useEffect } from 'react';
// // import {NavLink } from "react-router-dom";
// import Skeleton from 'react-loading-skeleton';

// const Productgallery = () => {

//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState(data);
//   const [loading, setLoading] = useState(false);
//   let componentMounted = true;

//   useEffect(() => {
//     const getProductgallery = async () => {
//       setLoading(true);
//       const response = await fetch("http://fakestoreapi.com/products");
//       if (componentMounted) {
//         setData(await response.clone().json());
//         setFilter(await response.json());
//         setLoading(false);
//         console.log(filter)
//       }
//       return () => {
//         componentMounted = false;
//       }
//     }
//     getProductgallery();
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div>
//         <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div>
//         <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div>
//         <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div>
//         <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div>
//         {/* <div className='col-md-3'>
//           <Skeleton height={350}/>
//         </div> */}
//       </>
//     );
//   };

//   const filterproduct = (cat) =>{
//     const updateList = data.filter((x)=>x.category === cat);
//     setFilter(updateList);
//   }

//   const ShowProducts = () => {
//     return (
//       <>
//         {/* <div className='buttons d-flex justify-content-center mb-5 pb-5'>
//           <button className='btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All Items</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("protein")}>Protein</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("Life Style")}>Life Style</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("Nutrition")}>Nutrition</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("Vitamins")}>Vitamins</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("Whey")}>Whey</button>
//         </div> */}

//         <div className='buttons d-flex justify-content-center mb-5 pb-5'>
//           <button className='btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("men's clothing")}>Men's Clothing</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("women's clothing")}>Women's Clothing</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("jewelery")}>Jewelery</button>
//           <button className='btn btn-outline-dark me-2' onClick={() =>filterproduct("electronics")}>Electronic</button>
//         </div>
//         {filter.map((product) => {
//           return (
//             <>
//               <div className='col-md-3 mb-4'>
//                 <div class="card h-100 text-center p-4" key={product.id}>
//                   <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
//                   <div class="card-body">
//                     <h5 class="card-title mb-0">{product.title.substring(0,12)}...</h5>
//                     <p class="card-text lead fw-bold">${product.price}</p>
//                     {/* <NavLink to={`/products/${product.id}`} class="btn btn-outline-dark">Bay Now</NavLink> */}
//                     <a href='#' className='btn btn-outline-dark'>Bay Now</a>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )
//         })}
//       </>
//     )
//   }

//   return (
//     <div>
//       <div className='container my-5 py-5 '>
//         <div className='row'>
//           <div className='col-12 mb-5 praduct'>
//             <h1 className='display-6 fw-bolder text-center'>Product Gallery</h1>
//             {/* <hr /> */}
//             <div className='bar'></div>
//           </div>
//         </div>
//         <div className='row justify-content-center'>
//           {loading ? <Loading /> : <ShowProducts />}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Productgallery;

import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../features/product/productSlice";

const Productgallery = () => {
  // const [key, setKey] = useState("all item");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const imgUrl = process.env.REACT_APP_BASE_URL_IMAGE;

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);

  const { products } = useSelector((state) => state?.product);
  const { home } = useSelector((state) => state.page);

  const galleryProducts = home?.productGallery.map(productId => {
    return products.find(product => product._id === productId);
  });


  return (
    <div>
      <section className="product-gallery py-5">
        <Container>
          <Row className="justify-content-center align-item-center">
            <Col lg={4} className="text-center">
              <h3 className="product-tab-title mb-1">Product Gallery</h3>
              <div className="bar"></div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col lg={8} md={10} sm={9} className="tabs-col">
              <Row className="product-row flex-wrap-wrap">
                {galleryProducts?.map((el,i) => {
                  return (
                    <Col
                      key={i}
                      lg={4}
                      md={6}
                      sm={6}
                      className="product-col mb-1"
                    >
                      <div className="img-card">
                        <div className="text-center mb-2">
                          <Link to={`/product/${el?._id}`}>
                            <img
                              className="product-img"
                              src={imgUrl + el?.thumbnailImage}
                              alt={el?.name}
                            />
                          </Link>
                        </div>
                        <div
                          onClick={() => navigate(`/product/${el?._id}`)}
                          className="buy-btn"
                        >
                          Buy Now
                        </div>
                      </div>
                      <div className="price-detail p-1">
                        <h6 className="pro-name m-0">{el?.name}</h6>
                        <div className="pro-price d-flex align-items-center">
                          <s className="offer-price m-0 fw-bold">&#x20B9; {el?.offerPrice} </s>
                          <p className="price m-0 ms-2">
                          &#x20B9; {el?.price}{" "}
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
    // <div>
    //   <section className="product-gallery py-5">
    //     <Container>
    //       <Row className="justify-content-center align-item-center">
    //         <Col lg={4} className="text-center">
    //           <h3 className="product-tab-title mb-1">Product Gallery</h3>
    //           <div className="bar"></div>

    //         </Col>
    //       </Row>
    //       <Row className="align-items-center justify-content-center">
    //         <Col lg={8} md={10} sm={9} className="tabs-col">
    //           <Row className="product-row flex-wrap-wrap">
    //             {home?.productGallery?.map((el) => {
    //               return (
    //                 <>
    //                   <Col
    //                     key={el?._id}
    //                     lg={4}
    //                     md={6}
    //                     sm={6}
    //                     className="product-col mb-1"
    //                   >
    //                     <div className="img-card">
    //                       <div className="text-center mb-2">
    //                         <Link to={`/product/${el?._id}`}>
    //                           <img
    //                             className="product-img"
    //                             src={el?.thumbnailImage}
    //                             alt={el?.name}
    //                           />
    //                         </Link>
    //                       </div>
    //                       <div
    //                         onClick={() => navigate(`/product/${el?._id}`)}
    //                         className="buy-btn"
    //                       >
    //                         Buy Now
    //                       </div>
    //                       {/* <div className="offer">30% OFF</div> */}
    //                     </div>
    //                     <div className="price-detail p-1">
    //                       <h6 className="pro-name m-0">{el?.name}</h6>
    //                       <div className="pro-price">
    //                         <s className="price m-0">RS. {el?.price} </s>
    //                         <p className="offer-price m-0 ms-2">
    //                           RS. {el?.price}{" "}
    //                         </p>
    //                       </div>
    //                     </div>
    //                   </Col>
    //                 </>
    //               );
    //             })}

    //             {/* <Col lg={4} md={6} sm={6} className="product-col mb-1">
    //               <div className="img-card">
    //                 <div className="text-center mb-2">
    //                   <img className="product-img" src={product1} alt="img1" />
    //                 </div>
    //                 <div className="buy-btn">Buy Now</div>
    //                 <div className="offer">30% OFF</div>
    //               </div>
    //               <div className="price-detail p-1">
    //                 <h6 className="pro-name m-0">Vidmate Capsule</h6>
    //                 <div className="pro-price">
    //                   <s className="price m-0">€120.00</s>
    //                   <p className="offer-price m-0 ms-2">€100.00</p>
    //                 </div>
    //               </div>
    //             </Col>
    //             <Col lg={4} md={6} sm={6} className="product-col mb-1">
    //               <div className="img-card">
    //                 <div className="text-center mb-2">
    //                   <img className="product-img" src={product1} alt="img1" />
    //                 </div>
    //                 <div className="buy-btn">Buy Now</div>
    //                 <div className="offer">30% OFF</div>
    //               </div>
    //               <div className="price-detail p-1">
    //                 <h6 className="pro-name m-0">Vidmate Capsule</h6>
    //                 <div className="pro-price">
    //                   <s className="price m-0">€120.00</s>
    //                   <p className="offer-price m-0 ms-2">€100.00</p>
    //                 </div>
    //               </div>
    //             </Col>
    //             <Col lg={4} md={6} sm={6} className="product-col mb-1">
    //               <div className="img-card">
    //                 <div className="text-center mb-2">
    //                   <img className="product-img" src={product1} alt="img1" />
    //                 </div>
    //                 <div className="buy-btn">Buy Now</div>
    //                 <div className="offer">30% OFF</div>
    //               </div>
    //               <div className="price-detail p-1">
    //                 <h6 className="pro-name m-0">Vidmate Capsule</h6>
    //                 <div className="pro-price">
    //                   <s className="price m-0">€120.00</s>
    //                   <p className="offer-price m-0 ms-2">€100.00</p>
    //                 </div>
    //               </div>
    //             </Col>
    //             <Col lg={4} md={6} sm={6} className="product-col mb-1">
    //               <div className="img-card">
    //                 <div className="text-center mb-2">
    //                   <img className="product-img" src={product1} alt="img1" />
    //                 </div>
    //                 <div className="buy-btn">Buy Now</div>
    //                 <div className="offer">30% OFF</div>
    //               </div>
    //               <div className="price-detail p-1">
    //                 <h6 className="pro-name m-0">Vidmate Capsule</h6>
    //                 <div className="pro-price">
    //                   <s className="price m-0">€120.00</s>
    //                   <p className="offer-price m-0 ms-2">€100.00</p>
    //                 </div>
    //               </div>
    //             </Col>
    //             <Col lg={4} md={6} sm={6} className="product-col mb-1">
    //               <div className="img-card">
    //                 <div className="text-center mb-2">
    //                   <img className="product-img" src={product1} alt="img1" />
    //                 </div>
    //                 <div className="buy-btn">Buy Now</div>
    //                 <div className="offer">30% OFF</div>
    //               </div>
    //               <div className="price-detail p-1">
    //                 <h6 className="pro-name m-0">Vidmate Capsule</h6>
    //                 <div className="pro-price">
    //                   <s className="price m-0">€120.00</s>
    //                   <p className="offer-price m-0 ms-2">€100.00</p>
    //                 </div>
    //               </div>
    //             </Col> */}
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </section>
    // </div>
  );
};

export default Productgallery;
