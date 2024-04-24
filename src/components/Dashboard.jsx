import * as React from 'react';
import { Stack } from '@mui/material';
import GeneralApp from './GeneralApp';
import Sidebar from './Sidebar';

export default function Dashboard() {

  return (

    <Stack direction="row">
      {/* Sidebar */}
      <Sidebar/>

      {/* General App */}
      <GeneralApp />
    </Stack>

  );

}