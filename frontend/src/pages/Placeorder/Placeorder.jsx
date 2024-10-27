import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Placeorder = () => {
  const navigate=useNavigate();
    const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
    const[data,setData]=useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    })

    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(prevdata=>({...prevdata,[name]:value}))
    }

    const placeOrder=async (event)=>{
      event.preventDefault();
      let orderItems=[];
      food_list.map((item)=>{
        if(cartItems[item._id]>0){
          let itemInfo=item;
          itemInfo["quantity"]=cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })
      let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+12*getTotalCartAmount()/100,
      }
      let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const {session_url}= response.data;
        // window.location.replace(session_url);
        navigate('/myorders')
      }
      else{
        alert("Error")
      }
    }



    useEffect(()=>{
      if(!token){
        navigate('/cart')
      }
      else if(getTotalCartAmount()===0){
        navigate('/cart');
      }
    },[token])

    return (
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
              <input required 
                type="text" 
                name="firstName" 
                value={data.firstName} 
                onChange={onChangeHandler} 
                placeholder='First Name'/>
              <input 
                type="text" 
                name="lastName" 
                value={data.lastName} 
                onChange={onChangeHandler} 
                placeholder='Last Name'/>
          </div>
          <input 
            type="email" 
            name="email" 
            value={data.email} 
            onChange={onChangeHandler} 
            placeholder='Email address'/>
          <input 
            type="text" 
            name="street" 
            value={data.street} 
            onChange={onChangeHandler} 
            placeholder='Street'/>
          <div className="multi-fields">
              <input 
                type="text" 
                name="city" 
                value={data.city} 
                onChange={onChangeHandler} 
                placeholder='City'/>
              <input 
                type="text" 
                name="state" 
                value={data.state} 
                onChange={onChangeHandler} 
                placeholder='State'/>
          </div>
          <div className="multi-fields">
              <input 
                type="text" 
                name="zipcode" 
                value={data.zipcode} 
                onChange={onChangeHandler} 
                placeholder='Zip Code'/>
              <input 
                type="text" 
                name="country" 
                value={data.country} 
                onChange={onChangeHandler} 
                placeholder='Country'/>
          </div>
          <input 
            type="text" 
            name="phone" 
            value={data.phone} 
            onChange={onChangeHandler} 
            placeholder='Mobile Number'/>
        </div>
  
        <div className="place-order-right">
        <div className="cart-total">
              <h2>Order Total</h2>
              <div>
                  <div className="cart-total-details">
                      <p>Sub Total:</p>
                      <p>{getTotalCartAmount()}Rs</p>
                  </div>
                  <div className="cart-total-details">
                      <p>Delivery Fee:</p>
                      <p>15 Rs</p>
                  </div>
                  <div className="cart-total-details">
                      <b>Total</b>
                      <b>{getTotalCartAmount()+15}Rs</b>
                  </div>
              </div>
              <button type='submit'>Confirm Order</button>
          </div>
        </div>
      </form>
    )
  }

export default Placeorder