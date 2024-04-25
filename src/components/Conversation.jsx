import { Box, Stack, Avatar, Typography, Badge, styled, IconButton, Divider, TextField, InputAdornment } from '@mui/material'
import { faker } from '@faker-js/faker'
import React, { useContext } from 'react'
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from 'phosphor-react';
import { AppContext } from '../Context/ParentContext';
import Header from './Conversation/Header';
import Footer from './Conversation/Footer';
import Message from './Conversation/Message';


function Conversation() {

    const {isToggled} = useContext(AppContext)

    return (
        <Stack sx={{ height: "100%", maxHeight: "100vh", width: "99.8%" }} >

            {/* Chat Header */}
            <Header />

            {/* Message */}
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll", '&::-webkit-scrollbar': {display: 'none'} }}>
                <Message />
            </Box>

            {/* Chat Footer */}
            <Footer />

        </Stack>
    )
}

export default Conversation