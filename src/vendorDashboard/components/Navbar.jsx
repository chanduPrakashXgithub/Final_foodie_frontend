import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showLogoutHandler,showLogout}) => {
  const firmName=localStorage.getItem('firmname')

  return (
    <div className='navSection'>
        <div className='company'>Vendor Dashboard</div>
        <div className="firmname">
          <h3>Firmname : {firmName}</h3>
        </div>


      <div className='userAuth'>
        {!showLogout ?     <>
          <span onClick={showLoginHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span> 
          
        </> :  <span onClick={showLogoutHandler}>Logout</span>   }

       
      </div>
    </div>
   
  )
}

export default Navbar