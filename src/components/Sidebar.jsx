import React, { useState, useContext } from 'react'
import { ChatCircleDots, Gear, SignOut, User, Phone, Users } from "phosphor-react";
import { Box, Stack, IconButton, Divider, Avatar, Switch, Menu, MenuItem } from '@mui/material';
import { AppContext } from '../Context/ParentContext';
import { faker } from '@faker-js/faker';
import Logo from '../assets/logo.png'
import AntSwitch from './MUI/AntSwitch';


const Sidebar = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [selected, setSelected] = useState(0)
    const { isToggled, setIsToggled } = useContext(AppContext)

    const Nav_Buttons = [
        {
            index: 0,
            icon: <ChatCircleDots />,
        },
        {
            index: 1,
            icon: <Users />,
        },
        {
            index: 2,
            icon: <Phone />,
        }
    ];

    const Profile_Menu = [
        {
            title: "Profile",
            icon: <User />,
        },
        {
            title: "Settings",
            icon: <Gear />,
        },
        {
            title: "Logout",
            icon: <SignOut />,
        },
    ];

    return (
        <Box p={1} sx={{ backgroundColor: isToggled ? "white" : "#1F2631", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "calc(100vh - 16px)", width: 70 }}>

            <Stack direction="column" justifyContent="space-between" alignItems={"center"} sx={{ height: "100%" }} spacing={3}>

                <Stack alignItems={"center"} spacing={4}>

                    <Box sx={{ backgroundColor: "rgb(18,81,175)", height: 64, width: 64, borderRadius: 1.5, }}>
                        <img src={Logo} height={64} width={64} alt={"Chat App Logo"} />
                    </Box>

                    <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={3}>
                        {Nav_Buttons.map((el) => (
                            el.index === selected ?
                                <Box key={el.index} p={1} sx={{ backgroundColor: "#0056B9", borderRadius: 1.5 }}>
                                    <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}>
                                        {el.icon}
                                    </IconButton>
                                </Box>
                                : <IconButton onClick={() => setSelected(el.index)} sx={{ width: "max-content", color: isToggled ? "#000" : "#fff" }} key={el.index}>
                                    {el.icon}
                                </IconButton>
                        ))}
                        <Divider sx={{ width: "48" }} />
                        {selected === 3 ?
                            <Box p={1} sx={{ backgroundColor: "#0056B9", borderRadius: 1.5 }}>
                                <IconButton sx={{ width: "max-content", color: "#fff" }} >
                                    <Gear />
                                </IconButton>
                            </Box>
                            :
                            <IconButton onClick={() => setSelected(3)} sx={{ width: "max-content", color: isToggled ? "#000" : "#fff" }} >
                                <Gear />
                            </IconButton>
                        }
                    </Stack>
                </Stack>

                <Stack spacing={4}>
                    <AntSwitch onClick={() => setIsToggled(prev => !prev)} defaultChecked={isToggled} />
                    <Avatar
                        id="basic-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        src={faker.image.avatar()}
                    />
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Stack spacing={1} px={1}>
                            {Profile_Menu.map((el) => (
                                <MenuItem onClick={handleClick}>
                                    <Stack key={el.title} sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent="space-between" >
                                        <span>{el.title}</span>
                                        {el.icon}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>

        </Box >
    )
}

export default Sidebar