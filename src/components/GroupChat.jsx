import { Box, Divider, IconButton, Link, Stack, Typography, useTheme, styled, Badge, Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../Context/ParentContext'
import { faker } from '@faker-js/faker';
import Search from './Search/Search'
import SearchIconWrapper from './Search/SearchIconWrapper'
import StyledInputBase from './Search/StyledInputBase'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import ChatElement from './Chats/ChatElement';

const ChatList = [
    {
        id: 0,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: true,
        online: true,
    },
    {
        id: 1,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "12:02",
        unread: 2,
        pinned: true,
        online: false,
    },
    {
        id: 2,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "10:35",
        unread: 3,
        pinned: false,
        online: true,
    },
    {
        id: 3,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "04:00",
        unread: 0,
        pinned: false,
        online: true,
    },
    {
        id: 4,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 5,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 6,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
    {
        id: 7,
        img: faker.image.avatar(),
        name: faker.name.firstName(),
        msg: faker.music.songName(),
        time: "08:42",
        unread: 0,
        pinned: false,
        online: false,
    },
];

const GroupChat = () => {

    const theme = useTheme();

    const { isToggled } = useContext(AppContext)

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                <Box sx={{ position: "relative", width: 312, backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 025)" }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "calc(100vh - 48px)" }}>
                        <Typography variant='h5' sx={{ color: isToggled ? "#000" : "#fff" }}>Groups</Typography>
                        <Stack width={"100%"}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color={isToggled ? "#709CE6" : "grey"} />
                                </SearchIconWrapper>
                                <StyledInputBase sx={{ color: isToggled ? "#36454F" : "	#fff", backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 20 }} placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                            </Search>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
                            <Typography sx={{ cursor: "pointer" }} variant='subtitle2' component={Link}>Create New Group</Typography>
                            <IconButton><Plus style={{ color: theme.palette.primary.main }} /></IconButton>
                        </Stack>
                        <Divider />

                        <Stack spacing={2} direction="column" sx={{
                            flexGrow: 1, overflow: "scroll", height: "100%", '&::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }} >
                            <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }} >
                                    Pinned
                                </Typography>
                                {ChatList.filter((el) => el.pinned).map((el) => {
                                    return <ChatElement key={el.id} {...el} />
                                })}
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }} >
                                    All Groups
                                </Typography>
                                {ChatList.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement key={el.id} {...el} />
                                })}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

        </>
    )
}

export default GroupChat