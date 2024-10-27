import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {


    const {cartItems,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext)
    const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        {food_list.map((item,index)=>{
            if(cartItems[item._id]>0){
                return (
                    <div>

                    <div className='cart-items-title cart-items-item'>
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.price}Rs</p>
                        <p>{cartItems[item._id]}</p>
                        <p>{item.price*cartItems[item._id]}Rs</p>
                        <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                    </div>
                    </div>
                )
            }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
            <h2>Order Total</h2>
            <div>
                <div className="cart-total-details">
                    <p>Sub Total:</p>
                    <p>{getTotalCartAmount()}Rs</p>
                </div>
                <div className="cart-total-details">
                    <p>Delivery Fee:</p>
                    <p>{15}Rs</p>
                </div>
                <div className="cart-total-details">
                    <b>Total</b>
                    <b>{getTotalCartAmount()+15}Rs</b>
                </div>
            </div>
            <button onClick={()=>navigate('/order')}>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
