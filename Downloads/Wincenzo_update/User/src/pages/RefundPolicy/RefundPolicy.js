import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { getCancellation } from '../../features/cms/pageSlice';
export default function RefundPolicy() {
    const dispatch = useDispatch();
    const { cancellationAndRefund } = useSelector((state) => state.page);
    console.log(cancellationAndRefund)

    useEffect(() => {
        dispatch(getCancellation());
      }, [dispatch]);
    return (
        <>
            <section className='refund-policy'>
                <Container>
                    <Row className='justify-content-center mb-3'>
                        <Col lg={6} className='text-center'>
                            <h3 className='product-tab-title mb-1'>
                                Refund Policy
                            </h3>
                            <div className='bar'>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            
                            <p>{cancellationAndRefund?.description}</p>
                                                      
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
