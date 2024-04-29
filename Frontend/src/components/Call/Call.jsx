import { Box, Divider, Link, IconButton, useTheme, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Search from '../Search/Search'
import { faker } from '@faker-js/faker';
import SearchIconWrapper from '../Search/SearchIconWrapper'
import { MagnifyingGlass, Phone, Plus } from 'phosphor-react'
import StyledInputBase from '../Search/StyledInputBase'
import { AppContext } from '../../Context/ParentContext'
import { CallLogElements } from './CallElements'
import StartCall from '../StartCall/StartCall';

const CallLogs = [
    {
        id: 0,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        missed: false,
        incoming: true,
    },
    {
        id: 1,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        missed: true,
        incoming: true,
    },
    {
        id: 2,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        missed: false,
        incoming: false,
    },
    {
        id: 3,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        missed: false,
        incoming: true,
    },
    {
        id: 4,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        missed: true,
        incoming: false,
    },
]

const Call = () => {

    const { isToggled } = useContext(AppContext)
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme()

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                <Box sx={{ position: "relative", width: 312, backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 025)" }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "calc(100vh - 48px)" }}>
                        <Typography variant='h5' sx={{ color: isToggled ? "#000" : "#fff" }}>Call Log</Typography>
                        <Stack width={"100%"}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color={isToggled ? "#709CE6" : "grey"} />
                                </SearchIconWrapper>
                                <StyledInputBase sx={{ color: isToggled ? "#36454F" : "	#fff", backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 20 }} placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                            </Search>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
                            <Typography sx={{ cursor: "pointer" }} variant='subtitle2' component={Link}>Start new conversation</Typography>
                            <IconButton
                                onClick={() => setOpenDialog(true)}
                            ><Phone style={{ color: theme.palette.primary.main }} /></IconButton>
                        </Stack>
                        <Divider />

                        <Stack spacing={2} direction="column" sx={{
                            flexGrow: 1, overflow: "scroll", height: "100%", '&::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }} >
                            <Stack spacing={2.4}>
                                {/* Call Logs */}
                                {CallLogs.map((el) => <CallLogElements {...el} online={true} />)}


                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Call