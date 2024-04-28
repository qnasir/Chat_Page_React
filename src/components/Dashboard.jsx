import * as React from 'react';
import { Stack } from '@mui/material';
import Sidebar from './Sidebar';
import AllRoutes from '../routes/AllRoutes';
import { Navigate } from 'react-router-dom';


export default function Dashboard() {

  // if (!isAuthenticated ) {
  //   return <Navigate to="/auth/login" />
  // }

  return (

    <Stack direction="row">
      {/* Sidebar */}
      <Sidebar/>

      {/* All Routes */}
      <AllRoutes />
    </Stack>

  );

}