import React from 'react'
import { Box, Stack } from '@mui/material';
import Chats from './Chats'
import Conversation from './Conversation';

function GeneralApp() {
  return (
    <Stack direction="row" sx={{ width: "100%" }} >

        {/* Chat */}
        <Chats />

        {/* Conversation */}
        <Box sx={{ height: "100%", width: "calc(100vw - 507px)" ,backgroundColor: "#000" }}>
            <Conversation />
        </Box>

    </Stack>
  )
}

export default GeneralApp