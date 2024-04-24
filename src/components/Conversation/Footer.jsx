import React, { useContext, useState } from 'react'
import { Box, Stack, IconButton, InputAdornment, Fab, Tooltip } from '@mui/material'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';
import StyledInput from '../MUI/StyledInput'
import { AppContext } from '../../Context/ParentContext'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { Camera, File, Image, Sticker, User } from "phosphor-react";

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

const ChatInput = ({ setOpenPicker }) => {

    const [openActions, setOpenActions] = useState(false)

    return (
        <StyledInput fullWidth placeholder="Write a message..." variant="filled" InputProps={{
            disableUnderline: true,
            startAdornment: (
                <Stack sx={{ width: 'max-content' }}>
                    <Stack sx={{ position: "relative", display: openActions ? "inline-block" : "none" }}>
                        {Actions.map((el) => (
                            <Tooltip key={el.y} placement="right" title={el.title}>
                                <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.color }}>
                                    {el.icon}
                                </Fab>
                            </Tooltip>
                        ))}
                    </Stack>
                    <InputAdornment>
                        <IconButton onClick={() => setOpenActions((prev) => !prev)}>
                            <LinkSimple color={"grey"} />
                        </IconButton>
                    </InputAdornment>
                </Stack>),
            endAdornment:
                <InputAdornment>
                    <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                        <Smiley color={"grey"} />
                    </IconButton>
                </InputAdornment>
        }} />
    )
}


const Footer = () => {

    const { isToggled } = useContext(AppContext)
    const [openPicker, setOpenPicker] = useState(false)

    return (
        <Box p={2} sx={{ width: "97.2%", backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>

            <Stack sx={{ backgroundColor: isToggled ? "#fff" : "#353b45", borderRadius: 1.5 }} direction={"row"} alignItems={"center"} spacing={3}>
                {/* Chat Input */}
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker theme={isToggled ? "light" : "dark"} data={data} onEmojiSelect={console.log} />
                    </Box>
                    <ChatInput setOpenPicker={setOpenPicker} />
                </Stack>

                <Box sx={{ height: 48, width: 48, backgroundColor: "#0A54BD", borderRadius: 1.5 }}>
                    <Stack sx={{ width: "100%", height: "100%" }} alignItems={"center"} justifyContent={"center"} >
                        <IconButton>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>

        </Box>
    )
}

export default Footer