import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar'
import { Login } from './components/Login';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import './App.css';
import { Dashboard } from './components/Dashboard';


const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
