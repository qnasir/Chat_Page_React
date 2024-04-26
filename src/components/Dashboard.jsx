import * as React from 'react';
import { Stack } from '@mui/material';
import Sidebar from './Sidebar';
import AllRoutes from '../routes/AllRoutes';

export default function Dashboard() {

  return (

    <Stack direction="row">
      {/* Sidebar */}
      <Sidebar/>

      {/* All Routes */}
      <AllRoutes />
    </Stack>

  );

}