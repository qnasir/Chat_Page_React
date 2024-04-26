import { Avatar, Badge, Box, Stack, Typography } from "@mui/material"
import StyledBadge from "./StyledBadge"
import { useContext } from "react"
import { AppContext } from "../../Context/ParentContext"

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {

    const {isToggled} = useContext(AppContext)

    return (
        <Box p={2} sx={{ width: "88%", borderRadius: 1, backgroundColor: isToggled ? "#fff" : "#1F2631" }}>
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

export default ChatElement