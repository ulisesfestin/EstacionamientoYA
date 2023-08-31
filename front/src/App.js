import React from 'react'
import { Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar'
import { Login } from './components/Login';
import { Home } from './components/Home';

import './index.css';
import { Dashboard } from './components/Dashboard';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
