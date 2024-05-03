import React from 'react'
import { Container } from 'react-bootstrap'

export default function Banner() {
    return (
        <>
            <section className='product-banner'>
                <div className='overlay'>
                    <Container >
                        <div className='product-text'>
                            <h1 className='product-heading'>All Product</h1>
                            <p className='bread-crumb'>
                                Home | <span>All Product</span>
                            </p>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    )
}
