import React, { useContext } from 'react'
import { Box, Stack, Typography } from '@mui/material';
import Chats from './Chats'
import Conversation from './Conversation';
import { AppContext } from '../Context/ParentContext';
import Contact from './Contact';
import { useSelector } from 'react-redux';
import StarredMsgs from './ContactSection/StarredMsgs';
import SharedMsgs from './ContactSection/SharedMsgs';

import NoChatSvg from "../assets/Illustration/NoChat"

function GeneralApp() {

  const {isToggled} = useContext(AppContext)
  const { sidebar, chat_type, room_id } = useSelector((store) => store.app)

  return (
    <Stack direction="row" sx={{ width: "100%" }} >

        {/* Chat */}
        <Chats />

        {/* Conversation */}
        <Box sx={{ height: "100%", width: sidebar.open ? "calc(100vw - 704px)" : "calc(100vw - 392px)" ,backgroundColor: isToggled ? "#F0F4FA" : "#1F2631"}}>
          {room_id != null && chat_type === "individual" ? <Conversation /> : 
            <Stack spacing={2} sx={{height: "100%", width: "100%"}} alignItems={"center"} justifyContent={"center"} >
              <NoChatSvg />
              <Typography variant='subtitle2'>
                Select a conversation or start new one
              </Typography>
            </Stack>
          }
            
        </Box>

        {/* Contact Info */}
        {sidebar.open && (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />

            case "STARRED":
              return <StarredMsgs />
              
            case "SHARED":
              return <SharedMsgs />

            default:
              break;
          }
        })()}

    </Stack>
  )
}

export default GeneralApp