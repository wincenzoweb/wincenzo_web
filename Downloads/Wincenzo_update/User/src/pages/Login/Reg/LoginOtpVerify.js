import React from "react";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import loginbanner from "./img/Login-pana.svg";
import { useFormik } from "formik";
import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { LoginOTP } from "../../../features/auth/authSlice";

export default function LoginOtpVerify() {
let schema = yup.object().shape({


  otpCode: yup.string().required("Required"),
});

  const location = useLocation();
  const phone = location?.search?.split("?")[1];

  const dispatch = useDispatch();
 
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: phone || "",
      otpCode: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(LoginOTP(values));
      // if(res.data.status === "approved"){
      //     navigate('/')
      // }
    },
  });
  return (
    <>
      <div className="login-pag m-5 py-4">
        <Container className="">
          <Row className="align-items-center justify-content-center">
            <Col lg={6} md={6} className="login-left">
              <img src={loginbanner} className="img-fluid" alt="loginbanner" />
            </Col>
            <Col lg={4} md={6} className="login-right">
              <div className="login-header d-flex justify-content-between align-items-center">
                <h5>
                  Login to <span>Wincenzo</span>
                </h5>
                <div className="mb-2 f-pass d-flex  ">
                  <Link className="forgot-link" to="/login">
                    Login via phone number
                  </Link>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 form-focus">
                  <label className="focus-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    onChange={formik.handleChange("phoneNumber")}
                    value={formik.values.phoneNumber}
                    className="form-control floating"
                  />
                  <div className="text-danger err-text">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </div>
                </div>
                <div className="mb-3 form-focus">
                  <label className="focus-label">otpCode</label>
                  <input
                    name="otpCode"
                    type="text"
                    onChange={formik.handleChange("otpCode")}
                    value={formik.values.otpCode}
                    className="form-control floating"
                  />

                  <div className="text-danger err-text">
                    {formik.touched.otpCode && formik.errors.otpCode}
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg login-btn mb-3"
                  type="submit"
                >
                  Request for OTP
                </button>

                <div className="dont-have ">
                  Don’t have an account? <Link to="/register">Register</Link>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
