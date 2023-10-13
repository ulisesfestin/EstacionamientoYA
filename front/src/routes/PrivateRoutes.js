import React from 'react'
import { Route, Routes, Navigate} from "react-router-dom";

import { Dashboard } from '../components/Dashboard'


export const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
