import React from 'react'
import { Container } from 'react-bootstrap'


const Banner = () => {
  return (
    <div>
      <section className='blog-title'>
                <div className='overlay'>
                    <Container className=''>
                        <div className='blog-text'>
                            <h1 className='blog-heading'>Blog Post</h1>
                            <p className='bread-crumb'>
                                Home | <span>News & Media</span>
                            </p>
                        </div>
                    </Container>
                </div>
            </section>
    </div>
  )
}

export default Banner
