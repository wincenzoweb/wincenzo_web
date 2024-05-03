import React, { useEffect } from 'react'
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getshippinganddelivery } from '../../features/cms/pageSlice';
export const ShippingAndDelivery = () => {
    const dispatch = useDispatch();
    const { ShippingAndDelivery } = useSelector((state) => state.page);
    console.log(ShippingAndDelivery)

    useEffect(() => {
        dispatch(getshippinganddelivery());
      }, [dispatch]);

    return (
        <>
            <Container>
                <Row className="justify-content-center mb-3">
                    <Col lg={6} className="text-center">
                        <h3 className="product-tab-title mb-1">Shipping And Delivery</h3>
                        <div className="bar"></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p>{ShippingAndDelivery?.description}</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
