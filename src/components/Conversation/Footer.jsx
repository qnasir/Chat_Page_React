import React, { useContext, useState } from 'react'
import { Box, Stack, IconButton, InputAdornment } from '@mui/material'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';
import StyledInput from '../MUI/StyledInput'
import { AppContext } from '../../Context/ParentContext'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const ChatInput = ({setOpenPicker}) => {
    return (
        <StyledInput fullWidth placeholder="Write a message..." variant="filled" InputProps={{
            disableUnderline: true,
            startAdornment: <InputAdornment>
                <IconButton>
                    <LinkSimple color={"grey"} />
                </IconButton>
            </InputAdornment>,
            endAdornment: <InputAdornment>
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
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100}}>
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