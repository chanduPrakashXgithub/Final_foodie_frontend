import React from 'react'
import { LandingPage } from './vendorDashboard/pages/LandingPage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './vendorDashboard/components/forms/PageNotFound'

const App = () => {
  return (
    <div>
     
      <Routes>
        <Route path='/'element={<LandingPage/>} />
        <Route path='/*'element={<PageNotFound/>}/>   
           </Routes>
      
      
      
      
    </div>
  )
}

export default App