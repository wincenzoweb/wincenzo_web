import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTandC } from "../../features/cms/pageSlice";

export default function TermsAndCondi() {
  const dispatch = useDispatch();
  const { TermsAndConditions } = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(getTandC());
  }, [dispatch]);

  console.log(TermsAndConditions);

  return (
    <>
      <section className="terms-condition">
        <Container>
          <Row className="justify-content-center mb-3">
            <Col lg={6} className="text-center">
              <h3 className="product-tab-title mb-1">Terms & Conditions</h3>
              <div className="bar"></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{TermsAndConditions?.description}</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
