import React from 'react'
import { assets } from '../assets/assets'
function Footer() {
  return (
    <div className='flex items-center justify-center gap-4 py-3 mt-20 max-sm:flex-col max-sm:gap-3'>
        <img src={assets.logo} alt="" width={150}/>

      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:order-3 max-sm:border-l-0 max-sm:border-t max-sm:px-3 max-sm:pt-3 max-sm:text-center'>Copyright @Yacquup - Bile | All right reserved.</p>

        <div className='flex gap-2.5 cursor-pointer'>
            <img className='hover:scale-105 transition-all duration-20' src={assets.facebook_icon} alt="" width={35}/>
            <img className='hover:scale-105 transition-all duration-20' src={assets.twitter_icon} alt="" width={35}/>
            <img className='hover:scale-105 transition-all duration-20' src={assets.instagram_icon} alt="" width={35}/>
        </div>
        
    </div>
  )
}

export default Footer