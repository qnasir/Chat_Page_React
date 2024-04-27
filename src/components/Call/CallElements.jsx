import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { faker } from '@faker-js/faker';
import { AppContext } from '../../Context/ParentContext'
import StyledBadge from '../Chats/StyledBadge';
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react';

const CallLogElements = ({ online, incoming, missed }) => {

    const { isToggled } = useContext(AppContext)

    return (
        <>
            <Box p={2} sx={{ width: "88%", borderRadius: 1, backgroundColor: isToggled ? "#fff" : "#1F2631" }}>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <Stack spacing={2} direction="row" alignItems={"center"} >

                        {online ?
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" >
                                <Avatar src={faker.image.avatar()} />
                            </StyledBadge> : <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}
                            />
                        }

                        <Stack spacing={0.3}>
                            <Typography sx={{ color: isToggled ? "#000" : "#fff" }} variant='subtitle2'>
                                {faker.name.fullName()}
                            </Typography>
                            <Stack direction="row" alignContent="center" spacing={1}>
                                {incoming ? <ArrowDownLeft color={missed ? "red" : "green"} /> : <ArrowUpRight color={missed ? "red" : "green"} />}
                                <Typography variant='caption'>Yesterday 21:24</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <IconButton>
                        <Phone color="green" />
                    </IconButton>
                </Stack>
            </Box>
        </>
    )
}

const CallElemnt = ({ online }) => {

    const { isToggled } = useContext(AppContext)

    return (
        <>
            <Box p={2} sx={{ width: "88%", borderRadius: 1, backgroundColor: isToggled ? "#fff" : "#1F2631" }}>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <Stack spacing={2} direction="row" alignItems={"center"} >

                        {online ?
                            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" >
                                <Avatar src={faker.image.avatar()} />
                            </StyledBadge> : <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}
                            />
                        }

                        <Stack spacing={0.3}>
                            <Typography sx={{ color: isToggled ? "#000" : "#fff" }} variant='subtitle2'>
                                {faker.name.fullName()}
                            </Typography>

                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems={"center"}>
                        <IconButton>
                            <Phone color="green" />
                        </IconButton>
                        <IconButton>
                            <VideoCamera color="green" />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export { CallLogElements, CallElemnt }