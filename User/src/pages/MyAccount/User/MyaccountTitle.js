import React from 'react'
import { Container } from 'react-bootstrap'
// import "../Contact/Contact.css"
// import img1 from "../../../public/assets/images/video_bg.png"

export default function MyaccountTitle() {
    return (
        <>
            <section className='about-title'>
                <div className='overlay'>
                    <Container className=''>
                        <div className='about-text'>
                            <h1 className='about-heading'>My Account</h1>
                            <p className='bread-crumb'>
                                Home | <span>My Account</span>
                            </p>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}
