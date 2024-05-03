import React from "react";
import "./Login.css";
import { Col, Container, Row } from "react-bootstrap";
import loginbanner from "./img/Login-pana.svg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/auth/authSlice";

export default function LoginEmail() {
  let schema = yup.object().shape({
    email: yup.string().required("Email Number Required"),

    password: yup.string().required("Password is Required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state?.auth);
  const user = localStorage.getItem("USER");
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      console.log(values);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    },
  });

  if (isSuccess === true && user !== undefined) {
    navigate("/");
  }
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
                  <label className="focus-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange("email")}
                    value={formik.values.email}
                    className="form-control floating"
                  />
                  <div className="text-danger err-text">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="mb-3 form-focus">
                  <label className="focus-label">Password</label>
                  <input
                    name="password"
                    type="Password"
                    onChange={formik.handleChange("password")}
                    value={formik.values.password}
                    className="form-control floating"
                  />

                  <div className="text-danger err-text">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                <div className="mb-2 f-pass d-flex justify-content-between ">
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                  <Link className="forgot-link" to="/login-otp">
                    Login via OTP
                  </Link>
                </div>
                <button
                  className="btn btn-primary btn-lg login-btn mb-3"
                  type="submit"
                >
                  Login
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
