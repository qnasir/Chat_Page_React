import { Box, IconButton, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { AppContext } from '../../Context/ParentContext'
import { updateSidebarType } from '../../redux/slices/app'
import Message  from '../Conversation/Message'


const StarredMsgs = () => {

    const { isToggled } = useContext(AppContext)
    const dispatch = useDispatch()

    return (
        <Box sx={{ width: 312, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: "100%", backgroundColor: isToggled ? "fff" : "#171A21" }}>
                    <Stack sx={{ height: "60%", p: 2 }} direction="row" alignItems={"center"} spacing={3} >
                        <IconButton onClick={() => dispatch(updateSidebarType("CONTACT"))}>
                            <CaretLeft color={isToggled ? "grey" : "#fff"} />
                        </IconButton>
                        <Typography variant='subtitle2' color={isToggled ? "#000" : "#fff"}>Starred Messages</Typography>
                    </Stack>
                </Box>

            {/* Body */}

            <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll", '&::-webkit-scrollbar': { display: 'none' }, backgroundColor: isToggled ? "" : "#171A21" }} spacing={3} >
              <Message />
            </Stack>

            </Stack>
        </Box>
    )
}

export default StarredMsgs