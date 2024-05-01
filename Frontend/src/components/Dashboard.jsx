import * as React from 'react';
import { Stack } from '@mui/material';
import Sidebar from './Sidebar';
import AllRoutes from '../routes/AllRoutes';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Dashboard() {

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn ) {
    return <Navigate to="/auth/login" />
  }

  return (

    <Stack direction="row">
      {/* Sidebar */}
      <Sidebar/>

      {/* All Routes */}
      <AllRoutes />
    </Stack>

  );

}