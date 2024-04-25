import React, { useContext } from 'react'
import { Box, Stack, IconButton, Typography, Avatar, Divider, Button } from '@mui/material'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'
import { AppContext } from '../Context/ParentContext'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../redux/slices/app'
import { faker } from '@faker-js/faker'
import AntSwitch from './MUI/AntSwitch'


const Contact = () => {

  const { isToggled } = useContext(AppContext)
  const dispatch = useDispatch()

  return (
    <Box sx={{ width: 312, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: "100%", backgroundColor: isToggled ? "fff" : "#171A21" }}>
          <Stack sx={{ height: "60%", p: 2 }} direction="row" alignItems={"center"} justifyContent="space-between" spacing={3} >
            <Typography variant='subtitle2' color={isToggled ? "#000" : "#fff"}>Contact Info</Typography>
            <IconButton onClick={() => dispatch(toggleSidebar())}>
              <X color={isToggled ? "grey" : "#fff"} />
            </IconButton>
          </Stack>
        </Box>

        {/* Body */}

        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll", backgroundColor: isToggled ? "" : "#171A21" }} p={3} spacing={3} >
          <Stack alignItems={"center"} direction="row" spacing={2} >
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} sx={{ height: 64, width: 64 }} />
            <Stack spacing={0.5}>
              <Typography color={isToggled ? "#000" : "#fff"} sx={{ fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 }} >{faker.name.fullName()}</Typography>
              <Typography color={isToggled ? "#000" : "#fff"} variant='body2' fontWeight={400}>{'+91 79 8329 8429'}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems={"center"} justifyContent="space-evenly">
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone color={isToggled ? "grey" : "#fff"} />
              </IconButton>
              <Typography color={isToggled ? "#000" : "#fff"} variant='overline'>Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera color={isToggled ? "grey" : "#fff"} />
              </IconButton>
              <Typography color={isToggled ? "#000" : "#fff"} variant='overline'>Video</Typography>
            </Stack>
          </Stack>
          <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
          <Stack spacing={0.5}>
            <Typography color={isToggled ? "#000" : "#fff"} sx={{ fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 }}>About</Typography>
            <Typography color={isToggled ? "#000" : "#fff"} variant='body2'>Imagination is the only limit</Typography>
          </Stack>
          <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Typography color={isToggled ? "#000" : "#fff"} variant='subtitle2'>Media, Links & Docs</Typography>
            <Button endIcon={<CaretRight />}>
              401
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img height={"54px"} src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Star color={isToggled ? "#000" : "#fff"} size={21} />
              <Typography color={isToggled ? "#000" : "#fff"} variant='subtitle2'>Starred Messages</Typography>
            </Stack>
            <IconButton>
              <CaretRight color={isToggled ? "grey" : "#fff"} />
            </IconButton>
          </Stack>
          <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Stack direction="row" alignItems={"center"} spacing={2}>
              <Bell color={isToggled ? "#000" : "#fff"} size={21} />
              <Typography color={isToggled ? "#000" : "#fff"} variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider color={isToggled ? "#D3D3D3" : "#2F4F4F"} />
          <Typography color={isToggled ? "#000" : "#fff"}>1 group in common</Typography>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography color={isToggled ? "#000" : "#fff"} variant='subtitle2'>Kalvium Group</Typography>
              <Typography color={isToggled ? "#000" : "#fff"} variant='caption'>Owl, Parrot, Rabbit, You</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Button startIcon={<Prohibit />} fullWidth variant='outlined' >Block</Button>
            <Button startIcon={<Trash />} fullWidth variant='outlined' >Delete</Button>
          </Stack>
        </Stack>

      </Stack>
    </Box>
  )
}

export default Contact