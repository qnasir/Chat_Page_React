import React, { useContext } from 'react'
import { Box, Stack, Avatar, Typography, IconButton, Divider } from '@mui/material'
import { faker } from '@faker-js/faker'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from '../MUI/StyledBadge'
import { AppContext } from '../../Context/ParentContext';
// import { ToggleSidebar } from '../../redux/slices/app';
import { toggleSidebar } from '../../redux/slices/app';

import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const {isToggled} = useContext(AppContext)
    const dispatch = useDispatch()

    const { sidebar } = useSelector((store) => store.app)

    return (
        <Box p={1.5} sx={{ height: 60, width: sidebar.open ? "97.3%" : "98.1%", backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>

            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%", height: "100%" }} >
                <Stack onClick={() => {dispatch(toggleSidebar())}} direction="row" spacing={2}>
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
    )
}

export default Header