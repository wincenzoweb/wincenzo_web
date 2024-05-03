import React from 'react'
import { Container } from 'react-bootstrap'
// import '../../../public/assets/css/Contact.css'

const Banner = () => {
  return (
    <div>
      <section className='about-title'>
                <div className='overlay'>
                    <Container className=''>
                        <div className='about-text'>
                            <h1 className='about-heading'>Contact Us</h1>
                            <p className='bread-crumb'>
                                Home | <span>Contact Us</span>
                            </p>
                        </div>
                    </Container>
                </div>
            </section>
    </div>
  )
}

export default Banner
