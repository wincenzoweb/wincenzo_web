import React from 'react'
import { useSelector } from "react-redux";
const Topbar = () => {
  const { home } = useSelector((state) => state.page);
  return (
    <div>
      <div className='topbar'>
        <div className='container'>
            <div className='topnav'>
                <span>
                    {home?.topOfferLine}
                </span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
