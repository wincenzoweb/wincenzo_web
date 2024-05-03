import React from "react";
import "./AccountSettings.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { editUser } from "../../../features/auth/authSlice";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      username: user?.username || "",
    },
    onSubmit: (values) => {
      console.log(values);
      const data = {
        id: user._id,
        formData: values,
      };

      dispatch(editUser(data));
    },
  });

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Personal Information</h1>

      <form onSubmit={formik.handleSubmit} className="form">
        <Row>
          <Col lg={6}>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="username">
                Your Name <span>*</span>
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                onChange={formik.handleChange("username")}
                value={formik.values.username}
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="phoneNumber">
                Phone/Mobile <span>*</span>
              </label>
              <input
                className="form-control"
                type="tel"
                name="phone"
                id="phoneNumber"
                onChange={formik.handleChange("phoneNumber")}
                value={formik.values.phoneNumber}
              />
            </div>
          </Col>
        </Row>
        <Col>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
          </div>
        </Col>
        <button className="mainbutton1 mb-3">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
