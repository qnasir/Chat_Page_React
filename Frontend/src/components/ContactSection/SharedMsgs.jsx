import { Box, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { faker } from '@faker-js/faker'
import { AppContext } from '../../Context/ParentContext'
import { updateSidebarType } from '../../redux/slices/app'
import { DocMsg, LinkMsg } from '../Conversation/Msgtypes'

const SHARED_LINKS = [
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "link",
        preview: "Yep, I can also do that",
        incoming: true,
        outgoing: false,
    }
]

const SHARED_DOCS = [
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
    {
        type: "msg",
        subType: "doc",
        preview: "Yeah sure, here you go.",
        incoming: true,
        outgoing: false,
    },
]

const SharedMsgs = () => {

    const { isToggled } = useContext(AppContext)
    const dispatch = useDispatch()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 312, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{ boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", width: "100%", backgroundColor: isToggled ? "fff" : "#171A21", borderBottom: 1, borderColor: "#D3D3D3" }}>
                    <Stack sx={{ height: "60%", p: 2 }} direction="row" alignItems={"center"} spacing={3} >
                        <IconButton onClick={() => dispatch(updateSidebarType("CONTACT"))}>
                            <CaretLeft color={isToggled ? "grey" : "#fff"} />
                        </IconButton>
                        <Typography variant='subtitle2' color={isToggled ? "#000" : "#fff"}>Shared Messages</Typography>
                    </Stack>
                </Box>

            {/* Tablist */}
            <Tabs sx={{ px: 2, pt: 2 ,backgroundColor: isToggled ? "#fff" : "#171A21" }} value={value} onChange={handleChange} centered>
                    <Tab sx={{ color: isToggled ? "grey" : "#fff" }} label="Media" />
                    <Tab sx={{ color: isToggled ? "grey" : "#fff" }} label="Links" />
                    <Tab sx={{ color: isToggled ? "grey" : "#fff" }} label="Docs" />
                </Tabs>
            {/* Body */}

            <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll", '&::-webkit-scrollbar': { display: 'none' }, backgroundColor: isToggled ? "" : "#171A21" }} p={3} spacing={value === 1 ? 1 : 3} >
                {(() => {
                    switch (value) {
                        case 0:
                            // Images
                            return (<Grid spacing={1} container >
                                {
                                    [0,1,2,3,4,5,6].map((el) => {
                                      return  <Grid item xs={4} >
                                            <img height={"75px"} src={faker.image.avatar()} alt={faker.name.fullName()} />
                                        </Grid>
                                    })
                                }
                            </Grid>)

                        case 1:
                            // Links
                            return SHARED_LINKS.map((el) => <LinkMsg el={el} />)

                        case 2:
                            // Docs
                            return SHARED_DOCS.map((el) => <DocMsg el={el} />)

                        default:
                            break;
                    }
                })()}
            </Stack>

            </Stack>
        </Box>
    )
}

export default SharedMsgs