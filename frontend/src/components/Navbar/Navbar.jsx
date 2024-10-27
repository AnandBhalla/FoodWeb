import React,{useContext, useState} from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search_icon.png'
import basket from '../../assets/basket_icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({setshowLogin}) => {

    const [menu, setmenu] = useState("home");
    const {getTotalCartAmount,token,settoken}=useContext(StoreContext)
    const navigate=useNavigate();

    const logout=()=>{
      localStorage.removeItem("token")
      settoken("");
      navigate("/");
    }

    return (
      <div className='navbar'>
        <Link to='/'><img src={logo} alt="Logo" className="logo" /></Link>
  
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setmenu("home")}>
            <li className={menu === "home" ? "active" : ""}>Home</li>
          </Link>
          <Link to='/' onClick={() => {
          setmenu("menu");
          setTimeout(() => {
            document.getElementById('food-display').scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }}>
          <li className={menu === "menu" ? "active" : ""}>Menu</li>
        </Link>
        <Link to='/' onClick={() => {
          setmenu("contact");
          setTimeout(() => {
            document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
          }, 0);
        }}>
          <li className={menu === "contact" ? "active" : ""}>Contact</li>
        </Link>
        </ul>
        <div className="navbar-right">
          <img src={search} alt="" />
          <div className="navbar-search-icon">
            <Link to='/cart'>
              <img onClick={() => setmenu("cart")} className={menu === "cart" ? "active" : ""} src={basket} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setshowLogin(true)}>Sign In</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="Profile" />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="Bag" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>LogOut</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Navbar;