import React from 'react'
import { Stack } from '@mui/material';
import Chats from './Chats'

function GeneralApp() {
  return (
    <Stack direction="row" sx={{ width: "100%" }} >
        <Chats />
    </Stack>
  )
}

export default GeneralApp