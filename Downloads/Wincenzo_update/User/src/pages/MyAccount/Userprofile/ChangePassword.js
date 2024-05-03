import React from 'react'
import { Col } from 'react-bootstrap'


const ChangePassword = () => {
    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Change Password</h1>

            <div className='form'>
                <Col>
                    <div className='form-group mb-3'>
                        <label className='form-label' htmlFor='name'>Old Password <span>*</span></label>
                        <input className='form-control' type='password' name='password' />
                    </div>
                </Col>
                <Col>
                    <div className='form-group mb-3'>
                        <label className='form-label' htmlFor='phone'>New Password <span>*</span></label>
                        <input className='form-control' type='password' name='cpassword' />
                    </div>
                </Col>

            </div>

            <button className='mainbutton1 mb-3'

            >Save Changes</button>
        </div>
    )
}

export default ChangePassword