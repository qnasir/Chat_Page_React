import React, { useContext, useState } from 'react'
import { Box, IconButton, Stack, Typography, InputBase, styled, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react'
import { faker } from '@faker-js/faker';
import { AppContext } from '../Context/ParentContext';

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

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {

    const {isToggled} = useContext(AppContext)

    return (
        <Box p={2} sx={{ width: "90%", borderRadius: 1, backgroundColor: isToggled ? "#fff" : "#1F2631" }}>
            <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                <Stack direction="row" spacing={2}>
                    {online ? <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot" >
                        <Avatar src={img} />
                    </StyledBadge> : <Avatar src={img} />}

                    <Stack spacing={0.3}>
                        <Typography sx={{ color: isToggled ?"#000" : "#fff" }} variant='subtitle2'>
                            {name}
                        </Typography>
                        <Typography sx={{ color: isToggled ?"#000" : "#fff" }} variant='caption'>
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600, color: isToggled ?"#000" : "#fff" }} variant='caption' >
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}>
                    </Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from search Icon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
    },
}))

function Chats() {

    const {isToggled} = useContext(AppContext)

    return (
        <Box sx={{ position: "relative",  width: 312, backgroundColor: isToggled ? "#F8FAFF" : "#171A21" , boxShadow: "0px 0px 2px rgba(0, 0, 0, 025)" }}>
            <Stack p={3} spacing={2} sx={{ height: "calc(100vh - 48px)" }} >
                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <Typography sx={{ color: isToggled ? "#000" : "#fff" }} variant="h5">
                        Chats
                    </Typography>
                    <IconButton sx={{ color: isToggled ? "#000" : "#fff" }} >
                        <CircleDashed />
                    </IconButton>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color={isToggled ? "#709CE6" : "grey"} />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ color: isToggled ? "#36454F" : "	#fff", backgroundColor: isToggled ? "#fff" : "#161A21", borderRadius: 20 }} placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction="row" alignItems={"center"} spacing={1.5}>
                        <ArchiveBox color={isToggled ? '#000' : '#fff'} size={24} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
                </Stack>
                <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: "scroll", height: "100%", '&::-webkit-scrollbar': {
                    display: 'none'
                } }} >
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
                            All Chats
                        </Typography>
                        {ChatList.filter((el) => !el.pinned).map((el) => {
                            return <ChatElement key={el.id} {...el} />
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chats