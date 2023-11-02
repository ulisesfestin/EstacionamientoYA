import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar'
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import { UserContext } from './context/UserContext';
import { useState } from 'react';
import './App.css';


const App = () => {

  const [user, setUser] = useState({
    role:'',
    logged:false,
    id: ''
  })

  return (
    <>
      <UserContext.Provider value={{ user, setUser }} >
        <Navbar />
        <Routes>
          {
            user.logged ? (
              <Route path="/*" element={<PrivateRoutes />} /> 
            ):(
              <Route path="/*" element={<PublicRoutes />} />
            )
          } 
        </Routes>
        <Footer />
      </UserContext.Provider> 
    </>
  )
}

export default App
