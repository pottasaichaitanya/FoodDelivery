import React,{useState} from 'react'
import Navbar from './components/NavBar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'



const App = () => {
  const [showLogIn,setShowLogIn]=useState(false)
    return (
    <>
    {showLogIn?<LoginPopUp setShowLogIn={setShowLogIn}/>:<></>}
    <div className='app'>
      <Navbar setShowLogIn={setShowLogIn}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App

