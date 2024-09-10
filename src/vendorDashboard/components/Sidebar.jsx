import React from 'react'

export const Sidebar = ({showFirmHandler,showProductHandler,showAllProductHandler,showFirmTitle}) => {
  return (
    <div className='SidebarSection'>
        <ul>
          {showFirmTitle ?  <li onClick={showFirmHandler}>Add Firm</li>:'' }
           
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showAllProductHandler}>All Product</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}
