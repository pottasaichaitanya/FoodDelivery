import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import {useFormik} from "formik"
import { StoreContext } from '../../StoreContext/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogIn}) => {
    const {url,setToken}=useContext(StoreContext)
    const [currState,setCurrState]=useState("Sign Up")
    const formik=useFormik({
      initialValues:{
        name:'',
        email:'',
        password:''
      },
      onSubmit:async(values)=>{
        let new_url=url;
        if(currState=='Sign Up'){
          new_url=url+'/api/user/register'
        }
        else{
          new_url=url+'/api/user/login'
        }
        const response=await axios.post(new_url,values)
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          setShowLogIn(false)
        }
        else{
          alert(response.data.message)
        }
      }
    })
  return (
    <div className='login-popup'>
      <form onSubmit={formik.handleSubmit} className="login-popup-container">
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>{setShowLogIn(false)}}src={assets.cross_icon}/>
        </div>
            <div className="login-popup-inputs">
                {currState==='Sign Up'?<input type='text'name='name'  value={formik.values.name} onChange={formik.handleChange} placeholder='Enter Your name here' required />:<></>}
                
                <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Enter your email here' required />
                <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='PassWord' required/>
            </div>
       
        <button type='submit'>{currState==='Sign Up'?'Create account':'Login'}</button>
        <div className="log-in-popup-condition">
            <input type="checkbox" required />
            <p>By continuing,i agree to the terms of use and privacy policy</p>
        </div>
        {currState==='Login'?<p>Create a new account ? <span onClick={()=>{setCurrState('Sign Up')}}>Click here</span></p>:<p>Already have an account ? <span onClick={()=>{setCurrState('Login')}}>Login here</span></p>}





      </form>
    </div>
  )
}

export default LoginPopUp
