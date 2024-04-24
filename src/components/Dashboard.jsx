import * as React from 'react';
import { useState, useContext } from 'react';
import { Box, Stack, IconButton, Divider, Avatar, Switch } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles'
import Logo from '../assets/logo.png'
import { ChatCircleDots, Gear, GearSix, Phone, SignOut, User, Users } from "phosphor-react";
import { faker } from '@faker-js/faker';
import GeneralApp from './GeneralApp';
import { AppContext } from '../Context/ParentContext';

export default function Dashboard() {

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      borderRadius: 8,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  const [selected, setSelected] = useState(0)
  const {isToggled, setIsToggled} = useContext(AppContext)

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

  return (

    <Stack direction="row">
      <Box p={1} sx={{ backgroundColor: isToggled ? "white" : "#1F2631", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 80 }}>

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
            <Avatar src={faker.image.avatar()} />
          </Stack>

        </Stack>

      </Box >
      <GeneralApp />
    </Stack>

  );
}