import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function CommingSoon() {

    const navigate = useNavigate()
    const handelBackToHome = () => {
        navigate('/')
    }
    return (
        <>
            <div className='py-5'>
                <Container>
                    <Row className='align-items-center justify-content-center mb-5'>
                        <Col lg={6} className='text-center'>
                            <h4>Comming Soon.....</h4>
                        </Col>
                    </Row>
                    <Row className='align-items-center justify-content-center'>
                        <Col lg={6} className='text-center'>
                            <Button className='btn order-btn' onClick={handelBackToHome}>Back To Home</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

