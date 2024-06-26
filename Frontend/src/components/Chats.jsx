import React, { useContext, useEffect, useState } from 'react'
import { Box, IconButton, Stack, Typography, InputBase, styled, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react'
import { faker } from '@faker-js/faker';
import { AppContext } from '../Context/ParentContext';
import Search from './Search/Search';
import SearchIconWrapper from './Search/SearchIconWrapper';
import StyledInputBase from './Search/StyledInputBase';
import ChatElement from './Chats/ChatElement';
import Friends from './Friends/Friends';
import { connectSocket, socket } from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { FetchDirectConversations } from '../redux/slices/conversation';

const user_id = window.localStorage.getItem("user_id")

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

function Chats() {

    const { isToggled } = useContext(AppContext)
    const [openDialog, setOpenDailog] = useState(false);

    const dispatch = useDispatch();

    const { conversations } = useSelector((state) => state.conversation.direct_chat);

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!socket) {
            connectSocket(user_id, () => {
                setIsConnected(true);
            });
        } else {
            socket.on('connect', () => setIsConnected(true));
            socket.on('disconnect', () => setIsConnected(false));
        }

        return () => {
            if (socket) {
                socket.off('connect');
                socket.off('disconnect');
            }
        };
    }, [user_id]);

    useEffect(() => {
        if (isConnected) {
            socket.emit("get_direct_conversations", { user_id }, (data) => {
                dispatch(FetchDirectConversations({ conversations: data }))
            });
        }
    }, [isConnected, user_id]);

    const handleCloseDialog = () => {
        setOpenDailog(false);
    }

    const handleOpenDialog = () => {
        setOpenDailog(true);
    }

    return (
        <>
            <Box sx={{ position: "relative", width: 312, backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 025)" }}>
                <Stack p={3} spacing={2} sx={{ height: "calc(100vh - 48px)" }} >
                    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                        <Typography sx={{ color: isToggled ? "#000" : "#fff" }} variant="h5">
                            Chats
                        </Typography>
                        <Stack direction="row" alignItems={"center"} spacing={1} >
                            <IconButton sx={{ color: isToggled ? "#000" : "#fff" }} onClick={() => {
                                handleOpenDialog();
                            }} >
                                <Users />
                            </IconButton>
                            <IconButton sx={{ color: isToggled ? "#000" : "#fff" }} >
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color={isToggled ? "#709CE6" : "grey"} />
                            </SearchIconWrapper>
                            <StyledInputBase sx={{ color: isToggled ? "#36454F" : "	#fff", backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 20 }} placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems={"center"} spacing={1.5}>
                            <ArchiveBox color={isToggled ? '#000' : '#fff'} size={24} />
                            <Button>Archive</Button>
                        </Stack>
                        <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
                    </Stack>
                    <Stack spacing={2} direction="column" sx={{
                        flexGrow: 1, overflow: "scroll", height: "100%", '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }} >
                        {/* <Stack spacing={2.4}>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }} >
                                Pinned
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack> */}
                        <Stack spacing={2.4}>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }} >
                                All Chats
                            </Typography>
                            {conversations.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>

            {openDialog && (<Friends open={openDialog} handleClose={handleCloseDialog} />)}

            {/* Right */}
            {/* TODO => Reuse Conversation Components */}
        </>
    )
}

export default Chats