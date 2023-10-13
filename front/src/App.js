import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar'
import { Login } from './components/Login';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import { UserContext } from './context/UserContext';
import { useState } from 'react';




const App = () => {

  const [user, setUser] = useState({
    role:'',
    logged:false
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
      </UserContext.Provider> 
    </>
  )
}

export default App
