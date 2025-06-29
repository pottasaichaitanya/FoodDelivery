import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../StoreContext/StoreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getCartTotalAmount,url} = useContext(StoreContext)
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
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            const quantity = cartItems[item._id];
            if (quantity > 0) {
              return (
                <div key={index}>
                  <div className=" cart-items-title cart-items-item" >
                    <img src={item.image} alt='' />
                    <p>{item.name}</p>
                    <p> {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹  { item.price * cartItems[item._id]}</p>
                    <p onClick={() => { removeFromCart(item._id) }} className='cross'>X</p>
                  </div>
                  <hr />
                </div>

              );
            }
          }
          )
        }
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>

              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>₹ {getCartTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>$ {getCartTotalAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>₹ {getCartTotalAmount()===0?0:getCartTotalAmount()+2}</b>
              </div>
              <hr />
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECK OUT</button>
          </div>


          <div className="cart-promocode">
            <div>
              <p>If you have Promocode,Enter it here</p>
              <div className="cart-promocode-input">
                <input type='text' placeholder='Enter PromoCode' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      

    </div>
  )
}

export default Cart
