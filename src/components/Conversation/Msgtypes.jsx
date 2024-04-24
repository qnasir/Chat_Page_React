import { Divider, Stack, Typography, Box, Link, IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/ParentContext'
import { DownloadSimple, Image } from 'phosphor-react'

const DocMsg = ({el}) => {

  const { isToggled } = useContext(AppContext)
  
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ?"#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
              <Stack spacing={2}>
                <Stack p={2} direction="row" spacing={3} boxShadow={"0px 0px 2px rgba(0, 0, 0, 0.25)"} alignItems={"center"} sx={{ backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 1 }}>
                  <Image color='grey' size={48}/>
                  <Typography variant='caption' color={isToggled ? "#000" : "#fff"}>Abstract.png</Typography>
                  <IconButton>
                    <DownloadSimple color='grey' />
                  </IconButton>
                </Stack>
                <Typography variant='body2' sx={{ color: el.incoming ? isToggled ? "#000" : "#fff" : "#fff" }} >{el.message}</Typography>
              </Stack>
            </Box>
    </Stack>
  )
}

const LinkMsg = ({el}) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ?"#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
              <Stack spacing={2}>
                <Stack p={2} spacing={3} sx={{ backgroundColor: isToggled ? "#fff" : "#1F2631", borderRadius: 1 }}>
                  <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
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
    </Stack>
  )
}

const ReplyMsg = ({el}) => {

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
    </Stack>
  )
}

const MediaMsg = ({el}) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
              <Stack spacing={1}>
                <img src={el.img} alt={el.message} style={{ maxHeight: 210, borderRadius: "10px" }} />
                <Typography variant="body2" color={el.incoming ? isToggled ? "#000" : "#fff" : "#fff"}>
                  {el.message}
                </Typography>
              </Stack>
            </Box>
    </Stack>
  )
}

const TextMsg = ({el}) => {

  const { isToggled } = useContext(AppContext)

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box p={1.5} sx={{ backgroundColor: el.incoming ? isToggled ? "#fff" : "#171A21" : "#0755B6", borderRadius: 1.5, width: "max-content" }}>
        <Typography variant='body2' color={el.incoming ? isToggled ? "#000" : "#fff" : "#fff"}>
          {el.message}
        </Typography>
      </Box>
    </Stack>
  )
}


const Timeline = ({el}) => {

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