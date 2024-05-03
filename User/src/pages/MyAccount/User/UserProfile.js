import React from 'react'
import { useParams } from 'react-router-dom'

import UserSidebar from '../Userprofile/UserSidebar'
import AccountSettings from '../Userprofile/AccountSettings'
import './UserProfile.css'
import ChangePassword from '../Userprofile/ChangePassword'
import YourOrders from '../Userprofile/YourOrders'
import UserAddress from '../Userprofile/UserAddress'



const Singleaccount = () => {

  const { activepage } = useParams()


  return (
    <div className='userprofile'>




      <div className='userprofilein'>
        <div className='left'>
          <UserSidebar activepage={activepage} />
        </div>
        <div className='right'>
          {activepage === 'accountsettings' && <AccountSettings />}
          {activepage === 'changepassword' && <ChangePassword />}
          {activepage === 'yourorders' && <YourOrders />}
          {activepage === 'address' && <UserAddress />}

        </div>
      </div>

    </div>
  )
}

export default Singleaccount