import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addInquiry, getOrg } from "../../features/cms/pageSlice";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import * as Yup from "yup";

const Form = () => {

  const dispatch = useDispatch()
  const { org } = useSelector((state) => state.page)
  useEffect(() => {
    dispatch(getOrg());
  }, [dispatch]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      subject: "",
      name: "",
      mobile: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      subject: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Invalid phone number")
        .required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (e) => {
      console.log(e);
      dispatch(addInquiry(e));
      formik.resetForm()
    },
  });

  return (
    <>
      <BreadCrumb heading={"Contact Us"} location={"Contact"} />
      <div className="statestic-block">
        <div className="container">
          <div className="statestic-inner">
            <div className="statestic-item">
              <div className="statestic-item-inner">
                <span className="heading">
                  <strong>Email Address</strong>
                </span>
                <span className="text-content">
                  {/* <p>Years of exprience</p> */}
                  <ul className="contact-list">
                    <li className="contact-list1">{org?.email}</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="statestic-item">
              <div className="statestic-item-inner">
                <span className="heading">
                  <strong>Phone Number</strong>
                </span>
                <span className="text-content">
                  {/* <p>Products</p> */}
                  <ul className="contact-list">
                    <li className="contact-list1">{org?.phoneNumber}</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="statestic-item">
              <div className="statestic-item-inner">
                <span className="heading">
                  <strong>Office Address</strong>
                </span>
                <span className="text-content">
                  {/* <p>Satisfied Customers</p> */}
                  <p className="contact-address">{org?.address}</p>
                </span>
              </div>
            </div>
          </div>

          <div className="form-main">
            <div className="container">
              <div className="form-widget">
                <div className="form-title">
                  <h5>Send Massage</h5>
                </div>
                <div className="form">
                  <form onSubmit={formik.handleSubmit} className="form-inner">
                    <div className="form-icon">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={formik.handleChange("name")}
                        value={formik.values.name}
                      />
                      <FaUser className="icon fauser" />
                      {formik.errors.name && (
                        <small className="text-danger">
                          {formik.errors.name}
                        </small>
                      )}
                    </div>

                    <div className="form-icon">
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        onChange={formik.handleChange("mobile")}
                        value={formik.values.mobile}
                      />
                      <MdOutlineLocalPhone className="icon localphone" />
                      {formik.errors.mobile && (
                        <small className="text-danger">
                          {formik.errors.mobile}
                        </small>
                      )}
                    </div>

                    <div className="form-inner">
                      <div className="form-icon">
                        <input
                          type="email"
                          placeholder="Enter email address "
                          onChange={formik.handleChange("email")}
                          value={formik.values.email}
                        />
                        <MdEmail className="icon mdemail" />
                        {formik.errors.email && (
                          <small className="text-danger">
                            {formik.errors.email}
                          </small>
                        )}
                      </div>
                      <div className="form-icon">
                        <input
                          type="text"
                          placeholder="Enter subject"
                          onChange={formik.handleChange("subject")}
                          value={formik.values.subject}
                        />
                        <FaBook className="icon fabook" />
                        {formik.errors.subject && (
                          <small className="text-danger">
                            {formik.errors.subject}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-inner">
                      <div className="form-icon1">
                        <textarea
                          name="description"
                          id="message"
                          placeholder="Your Massage"
                          onChange={formik.handleChange("description")}
                          value={formik.values.description}
                        ></textarea>
                        <FaPen className="icon fapen" />
                        {formik.errors.description && (
                          <small className="text-danger">
                            {formik.errors.description}
                          </small>
                        )}
                      </div>
                    </div>
                    <button className="btn6 " type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="map">
            <p>

              <iframe
                title="Office Map"
                src={org?.map}
                //   width="600"
                //   height="450"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
