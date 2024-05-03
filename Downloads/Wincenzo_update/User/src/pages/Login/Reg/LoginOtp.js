import React from "react";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import loginbanner from "./img/Login-pana.svg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import {  useSelector } from "react-redux";

import axios from "axios";
import { baseUrl } from "../../../configs/baseUrl";

export default function LoginOtp() {
  let schema = yup.object().shape({
    phoneNumber: yup.string().required("Phone Number Required"),
  });


  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state?.auth);
  console.log(isSuccess)
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const res = await axios.post(
        `${baseUrl}users/start-verification`,
        values
      );
      
      if (res?.data) {
        navigate(`/login-verify?${values?.phoneNumber}`);
      } else {
        console.log(res.response.data);
      }
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
                  <Link className="forgot-link" to="/signin">
                    Login via email
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
