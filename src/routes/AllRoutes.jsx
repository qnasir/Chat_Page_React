import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Settings from '../components/Settings'
import GeneralApp from '../components/GeneralApp'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import ResetPassword from '../components/Auth/ResetPassword'
import NewPassword from '../components/Auth/NewPassword'
import GroupChat from '../components/GroupChat'
import Call from '../components/Call/Call'
import Profile from '../components/Profile/Profile'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/app' element={<GeneralApp />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/call' element={<Call />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/reset-password' element={<ResetPassword />} />
            <Route path='/auth/new-password' element={<NewPassword />} />
            <Route path='/auth/register' element={<Settings />} />
            <Route path='/group' element={<GroupChat />} />
        </Routes>
    </>
  )
}

export default AllRoutes