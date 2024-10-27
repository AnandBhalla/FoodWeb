import React,{useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Placeorder from './pages/Placeorder/Placeorder'
import Cart from './pages/Cart/Cart' // Import Cart component
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {


  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
    {showLogin?<Login setshowLogin={setshowLogin}/>:<></>}
    <div className='app'>
      <Navbar setshowLogin={setshowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} /> 
        <Route path='/order' element={<Placeorder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
    </div>
      <Footer/>
    </>
  )
}

export default App
