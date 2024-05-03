import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addMessage, getOrg } from "../../features/cms/pageSlice";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const { org } = useSelector((state) => state.page);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrg());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email address is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addMessage(values));
      resetForm();
    },
  });

  return (
    <footer id="contact">
      <div className="main-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-inner">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to={"/"}>
                    <img src="assets/images/WincenzoLogowhite.png" alt='img' />
                  </Link>
                </div>
                <div className="footer-text">
                  <p>{org?.footerDiscription}</p>
                </div>
                <div className="footer-social">
                  <ul>
                    <li>
                      <Link to={org?.footerFacebookLogo}>
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={org?.footerTwitterLogo}>
                        {" "}
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={org?.footerLinkedInLogo}>
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={org?.footerInstagramLogo}>
                        {/* <i className="fab fa-instagram"></i> */}
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-inner">
              <div className="footer-widget">
                <div className="fw-title">
                  <h5>useful links</h5>
                </div>
                <div className="fw-link">
                  <ul>
                    <li>
                      <Link to={"/"}>
                        <i className="fas fa-caret-right"></i>Home
                      </Link>
                    </li>
                    <li>
                      <Link to={"/product"}>
                        <i className="fas fa-caret-right"></i>Product
                      </Link>
                    </li>
                    <li>
                      <Link to={"/blog"}>
                        <i className="fas fa-caret-right"></i>Blog
                      </Link>
                    </li>
                    <li>
                      <Link to={"/about"}>
                        <i className="fas fa-caret-right"></i>About us
                      </Link>
                    </li>
                    <li>
                      <Link to={"/contact"}>
                        <i className="fas fa-caret-right"></i>Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-inner">
              <div className="footer-widget">
                <div className="fw-title">
                  <h5>useful links</h5>
                </div>
                <div className="fw-link">
                  <ul>
                    <li>
                      <Link to={"/privacy"}>
                        <i className="fas fa-caret-right"></i>Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={"/termsandcondition"}>
                        <i className="fas fa-caret-right"></i>Terms & Conditions
                      </Link>
                    </li>

                    <li>
                      <Link to={'/shippinganddelivery'}>
                        <i className="fas fa-caret-right"></i>Shipping and Delivery
                      </Link>
                    </li>

                    <li>
                      <Link to={"/refundpolicy"}>
                        <i className="fas fa-caret-right"></i>Cancellation and Refund
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-inner">
              <div className="footer-widget">
                <div className="fw-title">
                  <h5>Send Your Message</h5>
                </div>
                <div className="footer-form">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your E-mail"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}

                    />
                    {formik.touched.email && formik.errors.email ? (
                      <small className="text-danger">{formik.errors.email}</small>
                    ) : null}
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Your Message"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}

                    />
                    {formik.touched.message && formik.errors.message ? (
                      <small className="text-danger">{formik.errors.message}</small>
                    ) : null}
                    <button type="submit" className="btn3">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right py-2">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} className="text-center">
              <p className="m-0">Copyright© <span>Wincenzo </span> | All Rights Reserved</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
