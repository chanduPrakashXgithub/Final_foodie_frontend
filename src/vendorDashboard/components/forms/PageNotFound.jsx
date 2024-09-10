import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
    <Link to='/'>
    <p>
         go back

        </p>
        </Link>
    
    <div className='errorsection'>
        <h1>404</h1>
        <div>page not found</div>
    </div>
    </>
  )
}

export default PageNotFound