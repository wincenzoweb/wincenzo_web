import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./BreasCrumb.css"

export default function BreadCrumb(props) {
    const location = props.location;
    const heading = props.heading;
    return (
        <>
            <div>
                <section className='blog-title'>
                    <div className='overlay'>
                        <Container className=''>
                            <div className='blog-text'>
                                <h3 className='blog-heading'>{heading}</h3>
                                <p className='bread-crumb'>
                                    <Link to={'/'}>Home</Link> | <span>{location}</span>
                                </p>
                            </div>
                        </Container>
                    </div>
                </section>
            </div>
        </>
    )
}
