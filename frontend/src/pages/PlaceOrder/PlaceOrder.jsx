import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../StoreContext/StoreContext'
const PlaceOrder = () => {
  const {getCartTotalAmount,cartItems, food_list,url,token} = useContext(StoreContext)
  const placeOrder = async (values) => {
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address:values,
      items:orderItems,
      amount:getCartTotalAmount()+2,
    }
    let response=await axios.post(url+'/api/order/place',orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data
      window.location.replace(session_url);
    }
    else{
      alert('Error')
    }

   

  }
  const navigate=useNavigate()
  useEffect(()=>{
    if(!token){
     navigate('/cart')
    }
    else if(getCartTotalAmount===0){
      navigate('/cart')
    }
    
  },[token])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: ''
    },
    onSubmit: (values) => {placeOrder(values) }

  })
  return (
    <form onSubmit={formik.handleSubmit} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' value={formik.values.firstName} onChange={formik.handleChange} placeholder='First name' />
          <input required type="text" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} placeholder='last name' />
        </div>
        <input required type='email' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Enter Your Email here' />
        <input required type='text' name='street' value={formik.values.street} onChange={formik.handleChange} placeholder='street' />
        <div className="multi-fields">
          <input required type="text" name='city' value={formik.values.city} onChange={formik.handleChange} placeholder='City' /><input required type="text"  placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name='zipcode' value={formik.values.zipcode} onChange={formik.handleChange} placeholder='Zip Code' /><input type="text" name='country' value={formik.values.country} onChange={formik.handleChange} placeholder='Country' />
        </div>
        <input required type='tel' name='phone' value={formik.values.phone} onChange={formik.handleChange} placeholder='Phone' />

      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>

            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹  {getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getCartTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
