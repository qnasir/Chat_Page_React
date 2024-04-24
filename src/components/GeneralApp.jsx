import React, { useContext } from 'react'
import { Box, Stack } from '@mui/material';
import Chats from './Chats'
import Conversation from './Conversation';
import { AppContext } from '../Context/ParentContext';

function GeneralApp() {

  const {isToggled} = useContext(AppContext)

  return (
    <Stack direction="row" sx={{ width: "100%" }} >

        {/* Chat */}
        <Chats />

        {/* Conversation */}
        <Box sx={{ height: "100%", width: "calc(100vw - 394px)", height: "100%", overflowY: "scroll", '&::-webkit-scrollbar': {display: 'none'} ,backgroundColor: isToggled ? "#F0F4FA" : "#1F2631"}}>
            <Conversation />
        </Box>

    </Stack>
  )
}

export default GeneralApp