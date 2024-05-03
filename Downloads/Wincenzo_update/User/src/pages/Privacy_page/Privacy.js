import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getPolicy } from "../../features/cms/pageSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Privacy() {
  const dispatch = useDispatch();
  const { PrivacyPolicy } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(getPolicy());
  }, [dispatch]);

  console.log(PrivacyPolicy);

  return (
    <>
      <section className="privacy">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={6} className="text-center">
              <h3 className="product-tab-title mb-1">Privacy Policy</h3>
              <div className="bar"></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{PrivacyPolicy?.description}</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
