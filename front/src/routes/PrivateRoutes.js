import React from 'react'
import { Route, Routes, Navigate} from "react-router-dom";

import { Dashboard } from '../components/Dashboard'
import { Parkings } from '../components/Parkings';
import { Analytics } from '../components/Analytics';
import { MyBooking } from '../components/MyBooking';
import { ReservationHistory } from '../components/ReservationHistory';
import { AddParking } from '../components/AddParking';
import { Home } from '../components/Home';


export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/parkings' element={<Parkings />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/mybooking' element={<MyBooking />} />
        <Route path='/reservationhistory' element={<ReservationHistory />} />
        <Route path='/addparking' element={<AddParking />} />
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
