import React, { useState } from 'react'
import './UserAddress.css'
import './AccountSettings.css'

import { useSelector } from 'react-redux'

const UserAddress = () => {
    const [show, setShow] = useState(false)


    const { user } = useSelector((state) => state?.auth);
    console.log(user)

    let shippingAddress = user?.shippingAddresses
    console.log(shippingAddress)

    // const savedaddress = [
    //     {
    //         AddressLine1: `${shippingAddress?.address !== undefined ? shippingAddress?.address : ""}`,
    //         AddressLine2: `${shippingAddress?.city !== undefined ? shippingAddress?.city : ""}`,
    //         AddressLine3: `${shippingAddress?.state !== undefined ? shippingAddress?.state : ""}`,
    //         AddressLine4: `${shippingAddress?.country !== undefined ? shippingAddress?.countr : ""}`,
    //     },
    // ]
    return (
        <div className='useraddress'>
            {
                !show && <h1 className='mainhead1 text-center'>Your Address</h1>
            }
            {
                !show &&

                <div className='addressin '>
                    {shippingAddress === undefined ?
                        (

                            <div className="address">
                                <p> Add Address</p>
                            </div>
                        )
                        :
                        (
                            shippingAddress?.map((item, index) => {
                                return (
                                    <div className='address' key={index}>
                                        <address>
                                            <p className='m-0'>
                                                {item.address}
                                            </p>
                                            <p className='m-0'>
                                                {item.city}
                                            </p>
                                            <p className='m-0'>
                                                {item.state}
                                            </p>
                                            <p className='m-0'>
                                                {item.country}
                                            </p>
                                            <p className='m-0'>
                                                {item.zipCode}
                                            </p>
                                        </address>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            }

        </div >
    )
}

export default UserAddress