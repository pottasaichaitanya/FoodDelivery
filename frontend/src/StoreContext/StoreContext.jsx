import { createContext, useEffect, useState } from 'react';
import axios from 'axios'



export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [cartItems, setcartItems] = useState({})
    const [food_list,setFood_list]=useState([])


    const addToCart = async(itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    }


    
    const removeFromCart = async(itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }



    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }



    const url = ''
    const [token, setToken] = useState('')


    const fetchFood_list=async()=>{
        const response=await axios.get(`${url}/api/food/list`)
        setFood_list(response.data.data)
    }


    const loadCartData=async(token)=>{
        const response= await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setcartItems(response.data.cartData)
         
     }

   
    useEffect(() => {
       
        const load_data=async()=>{
            await fetchFood_list();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
               await loadCartData(localStorage.getItem('token')) 
            }
            
        }
        load_data()
        
    }, [])



    const contextValue = {
        food_list,
        removeFromCart,
        addToCart,
        cartItems,
        setcartItems,
        getCartTotalAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
