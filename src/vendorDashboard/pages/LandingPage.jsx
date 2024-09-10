import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/forms/AllProducts'


export const LandingPage = () => {
const [showLogin,setShowLogin]=useState(false)
const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)


}
const[showRegister,setShowRegister]=useState(false)
const showRegisterHandler=()=>{
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)

}
const [showFirm,setShowFirm]=useState(false)
const showFirmHandler=()=>{
    if(showLogout){
        setShowFirm(true)
        setShowLogin(false)
        setShowRegister(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)

    }else{
        alert("You must be logged in to add a firm")
        setShowLogin(true)
    }



}
const [showProduct,setShowProduct]=useState(false)
const showProductHandler=()=>{
 if(showLogout){
    setShowProduct(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowWelcome(false)
    setShowAllProducts(false)
 }else{
    alert("You must be logged in to add a product")
    setShowLogin(true)

 }
}
const [showWelcome,setShowWelcome]=useState(false)
const ShowWelcomeHandler=()=>{
    setShowWelcome(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowAllProducts(false)

}
const [showAllProduct,setShowAllProducts]=useState(false)
const showAllProductHandler=()=>{
    if(showLogout){
        setShowAllProducts(true)
        setShowWelcome(false)
        setShowLogin(false)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)

    }else{
        alert("You must be logged in to see  all products")
        setShowLogin(true)
    
     }

}
const [showLogout,setShowLogout]=useState(false)
const showLogoutHandler=()=>{
    alert("Hey!! You want to logout ?")
    localStorage.removeItem('firmName');
    localStorage.removeItem("login-token");
    localStorage.removeItem("firmId");
    setShowLogout(false)
    setshowFirmTitle(true)

    
}
const [showFirmTitle,setshowFirmTitle]=useState(true)
useEffect(()=>{
    const firmName=localStorage.getItem('firmname');
    if(firmName){
        setshowFirmTitle(false)
    }
},[])

useEffect(() => {
    const token = localStorage.getItem('login-token');
    if (token) {
        setShowLogout(true);
        setShowWelcome(true); // Show the welcome page initially after login
    } else {
        setShowLogin(true);
         // Show login page if not logged in
    }
}, []);
    

  return (
    <>
       <section className='landingSection'>
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} showLogoutHandler={showLogoutHandler} />
        <div className="collectionSection">
        <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductHandler={showAllProductHandler} showFirmTitle={showFirmTitle}/>
        {showLogin && <Login ShowWelcomeHandler={ShowWelcomeHandler} />}
        {showRegister && <Register  showLoginHandler={showLoginHandler}/> }
        {showFirm && showLogout && <AddFirm/>}
        {showProduct && showLogout && <AddProduct/>}
        {showWelcome && <Welcome/>}
        {showAllProduct&& showLogout &&<AllProducts/>}
        {/* <Login/> */}
        {/* <Register/> */}
        {/* <AddFirm/> */}
        {/* <AddProduct/> */}

        </div>
       
       </section>
    </>
  )
}
