import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>Discover your favorite dishes and explore new flavors with our all-in-one food junction!</p>
        <button><a href="#food-display">View Menu</a></button>
      </div>
    </div>
  )
}

export default Header
