import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Settings from '../components/Settings'
import GeneralApp from '../components/GeneralApp'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/app' element={<GeneralApp />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
    </>
  )
}

export default AllRoutes