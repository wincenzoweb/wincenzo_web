import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addSubscriber } from '../../features/cms/pageSlice';
import { useDispatch } from 'react-redux';

const Newsletter = () => {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email address is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form submitted:', values);
            dispatch(addSubscriber(values));
            resetForm();
        },
    });

    return (
        <section className="newsletter-area">
            <div className="container">
                <div className="news-area">
                    <div className="newsletter-wrap">
                        <div className="news-inner">
                            <div className="news-signup col-lg-6">
                                <div className="newsletter-content">
                                    <h4>Newsletter Sign Up</h4>
                                    <span>Get notifications of our best deals...</span>
                                </div>
                            </div>
                            <div className="news-signup2 col-lg-6">
                                <div className="newsletter-form">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email..."
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                        </div>
                                        <div>
                                            <button type="submit" className="btn4">Subscribe</button>
                                        </div>
                                    </form>
                                    {formik.touched.email && formik.errors.email ? (
                                        <small className="text-danger d-flex justify-content-center">{formik.errors.email}</small>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
