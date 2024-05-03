import React, { useEffect } from 'react'
import reginbanner from "./img/Fill out-pana.svg"
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../features/auth/authSlice';

export default function Register() {
const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector((state) => state.auth);

const { isSuccess, registerUser } = user;

useEffect(() => {
  if (isSuccess === true && registerUser) {
    navigate("/login");
  }
}, [isSuccess, registerUser, navigate]);

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

  username: yup.string().required("Username is Required"),
  phoneNumber: yup.string().required("Mobile Number is Required"),
});


const formik = useFormik({
  initialValues: {
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  },
  validationSchema: schema,
  onSubmit: (values) => {
    // console.log(values);
    dispatch(register(values));
    formik.resetForm();
  },
});
    return (
      <>
        <div className="reg-page m-5 py-4">
          <Container className="g-0">
            <Row className="align-items-center justify-content-center">
              <Col lg={6} md={6} className="login-left">
                <img
                  src={reginbanner}
                  className="img-fluid"
                  alt="loginbanner"
                />
              </Col>
              <Col lg={4} md={6} className="login-right">
                <div className="login-header">
                  <h5>
                    Register to <span>Wincenzo</span>
                  </h5>
                </div>

                <form onSubmit={formik.handleSubmit} className="mx-auto">
                  <div className="mb-3">
                    <label className="focus-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      onChange={formik.handleChange("username")}
                      value={formik.values.username}
                      className="form-control floating"
                    />

                    <div className="text-danger err-text">
                      {formik.touched.username && formik.errors.username}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="focus-label">Mobile Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      onChange={formik.handleChange("phoneNumber")}
                      value={formik.values.phoneNumber}
                      className="form-control floating"
                    />
                    <div className="text-danger err-text">
                      {formik.touched.phoneNumber && formik.errors.phoneNumber}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="focus-label">Email</label>
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
                  <div className="mb-3">
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

                  <button
                    className="btn btn-lg register-btn mb-3"
                    type="submit"
                  >
                    Register
                  </button>

                  <div className="dont-have">
                    Don’t have an account?{" "}
                    <Link className="forgot-link" to="/login">
                      Login
                    </Link>{" "}
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
}
