import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Discover your favorite dishes and explore new flavors with our all-in-one food junction!</p>
            <p>Serving Since 2016 </p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>HOME</li>
                <li>CONTACT</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>
                GET IN TOUCH
            </h2>
            <ul>
                <li>+91 1234567890</li>
                <li>tomato@mail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
      <p>Copyright 2024 Tomato. All rights reserved.</p>
      </p>
    </div>
  )
}

export default Footer
