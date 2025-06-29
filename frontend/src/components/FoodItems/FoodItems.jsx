import React,{useContext, useState} from 'react'
import './FoodItems.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../StoreContext/StoreContext'

const FoodItems = ({id,name,price,description,image}) => {
    const [itemCount,setItemCount]=useState(0)
    const {removeFromCart,addToCart,cartItems,url}=useContext(StoreContext)

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img'src={image} alt=""/>
            {
            !cartItems[id]
                   ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
                   :<div className='food-item-Counter'> 
                   <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt=''/>
                   <p>{[cartItems[id]]}</p>                  
                    <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt=''/>
                    
                   </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className="food-item-price">₹  {price} </p>
        </div>
      
    </div>
  )
}

export default FoodItems
