import React, { useContext } from 'react'
import { Box, Stack } from '@mui/material';
import Chats from './Chats'
import Conversation from './Conversation';
import { AppContext } from '../Context/ParentContext';
import Contact from './Contact';
import { useSelector } from 'react-redux';

function GeneralApp() {

  const {isToggled} = useContext(AppContext)
  const { sidebar } = useSelector((store) => store.app)

  return (
    <Stack direction="row" sx={{ width: "100%" }} >

        {/* Chat */}
        <Chats />

        {/* Conversation */}
        <Box sx={{ height: "100%", width: sidebar.open ? "calc(100vw - 704px)" : "calc(100vw - 392px)" ,backgroundColor: isToggled ? "#F0F4FA" : "#1F2631"}}>
            <Conversation />
        </Box>

        {/* Contact Info */}
        {sidebar.open && <Contact />}

    </Stack>
  )
}

export default GeneralApp