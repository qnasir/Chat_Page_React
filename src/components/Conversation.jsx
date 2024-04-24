import { Box, Stack, Avatar, Typography, Badge, styled, IconButton, Divider, TextField, InputAdornment } from '@mui/material'
import { faker } from '@faker-js/faker'
import React, { useContext } from 'react'
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from 'phosphor-react';
import { AppContext } from '../Context/ParentContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledInput = styled(TextField)(({theme}) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
        color: "grey",
    }
}))

function Conversation() {

    const {isToggled} = useContext(AppContext)

    return (
        <Stack sx={{ height: "100%", maxHeight: "100vh", width: "auto" }} >

            {/* Chat Header */}

            <Box pl={2} sx={{ height: 70, width: "100%", backgroundColor: isToggled ? "#F8FAFF" : "#1F2631", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>

                <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }} >
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" >
                                <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
                            </StyledBadge>
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography sx={{ color: isToggled ? "#000" : "#fff" }} variant='subtitle2'>{faker.name.fullName()}</Typography>
                            <Typography sx={{ color: isToggled ? "grey" : "#fff" }} variant='caption'>Online</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <IconButton>
                            <VideoCamera color='grey' />
                        </IconButton>
                        <IconButton>
                            <Phone color='grey' />
                        </IconButton>
                        <IconButton>
                            <MagnifyingGlass color='grey' />
                        </IconButton>
                        <Divider color='grey' orientation="vertical" flexItem />
                        <IconButton>
                            <CaretDown color='grey' />
                        </IconButton>
                    </Stack>
                </Stack>

            </Box>

            {/* Message */}

            <Box width={"100%"} sx={{ flexGrow: 1 }}>

            </Box>

            {/* Chat Footer */}

            <Box p={2} sx={{ width: "98.4%", backgroundColor: isToggled ? "#F8FAFF" : "#1F2631", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>

                <Stack sx={{ backgroundColor: isToggled ? "#fff" : "#353b45", borderRadius: 1.5 }} direction={"row"} alignItems={"center"} spacing={3}>
                    <StyledInput fullWidth placeholder="Write a message..." variant="filled" InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment>
                            <IconButton>
                                <LinkSimple color={"grey"} />
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment>
                            <IconButton>
                                <Smiley color={"grey"} />
                            </IconButton>
                        </InputAdornment>
                    }} />
                    <Box sx={{ height: 48, width: 48, backgroundColor: "#0A54BD", borderRadius: 1.5 }}>
                        <Stack sx={{ width: "100%", height: "100%" }} alignItems={"center"} justifyContent={"center"} >
                        <IconButton>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                        </Stack>
                    </Box>
                </Stack>

            </Box>

        </Stack>
    )
}

export default Conversation