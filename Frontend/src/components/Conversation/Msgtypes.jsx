import { Divider, Stack, Typography, Box, Link, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/ParentContext'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react'
import { faker } from '@faker-js/faker'


const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const DocMsg = ({ el, menu }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Stack spacing={2}>
          <Stack p={2} direction="row" spacing={3} boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.25)"} alignItems={"center"} sx={{ backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 1 }}>
            <Image color='grey' size={48} />
            <Typography variant='caption' color={isToggled ? "#000" : "#fff"}>Abstract.png</Typography>
            <IconButton>
              <DownloadSimple color='grey' />
            </IconButton>
          </Stack>
          <Typography variant='body2' sx={{ color: el.incoming ? isToggled ? "#000" : "#fff" : "#fff" }} >{el.message}</Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const LinkMsg = ({ el, menu }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.7} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Stack spacing={2}>
          <Stack p={2} spacing={3} sx={{ backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 1 }}>
            <img src={faker.image.food()} alt={el.message} style={{ maxHeight: 170, borderRadius: "10px" }} />
            <Stack spacing={2}>
              <Typography variant='subtitle2' color={isToggled ? "#000" : "#fff"}>Creating Chat App</Typography>
              <Typography sx={{ color: "blue" }} variant='subtitle2' component={Link} to="//https://www.youtube.com">www.youtube.com</Typography>
            </Stack>
            <Typography variant="body2" color={el.incoming ? isToggled ? "#000" : "#fff" : "#fff"}>
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const ReplyMsg = ({ el, menu }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ backgroundColor: el.incoming ? "#fff" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Stack spacing={2}>
          <Stack p={2} direction="column" spacing={3} alignItems={"center"} sx={{ backgroundColor: "#fff", borderRadius: 1 }}>
            <Typography variant='body2' color={"#000"}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant='body2' color={el.incoming ? "#000" : "#fff"} >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const MediaMsg = ({ el, menu }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Stack spacing={1}>
          <img src={el.img} alt={el.message} style={{ maxHeight: 190, borderRadius: "10px" }} />
          <Typography variant="body2" color={el.incoming ? isToggled ? "#000" : "#fff" : "#fff"}>
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const TextMsg = ({ el, menu }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Typography variant='body2' color={el.incoming ? isToggled ? "#000" : "#fff" : "#fff"}>
          {el.message}
        </Typography>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const MessageOptions = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeVertical 
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} 
        size={20} 
      />

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem key={el.title} onClick={handleClick}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  )
}


const Timeline = ({ el }) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" alignItems={"center"} justifyContent="space-between" >
      <Divider width="46%" />
      <Typography variant='caption' color={isToggled ? "grey" : "#fff"}>{el.text}</Typography>
      <Divider width="46%" />
    </Stack>
  )
}

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg }