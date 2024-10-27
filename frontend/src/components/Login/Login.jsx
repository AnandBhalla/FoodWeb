import React,{useState,useEffect, useContext} from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Login = ({setshowLogin}) => {

    const { settoken, url } = useContext(StoreContext);
    const [currState, setcurrState] = useState("Sign Up")
    const [data, setdata] = useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setdata(prevdata=>({...prevdata,[name]:value}))
    }
    
    const onLogin=async (event)=>{
      event.preventDefault();
      let newUrl=url;
      if(currState==="Login") newUrl+="/api/user/login"
      else  newUrl+="/api/user/register"

      const response=await axios.post(newUrl,data)
      if(response.data.success){
        settoken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setshowLogin(false)
      }
      else{
        alert(response.data.message)
      }

    }


  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            <input type="email" placeholder='Your email' required name='email' onChange={onChangeHandler} value={data.email}/>
            <input type="password" placeholder='Password' required name='password' onChange={onChangeHandler} value={data.password}/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?        <p>Create a new account? <span onClick={()=>setcurrState("Sign Up")}>Click here</span></p>
:<p>Already have an account? <span onClick={()=>setcurrState("Login")}>Login here</span></p>
}
      </form>
    </div>
  )
}

export default Login
