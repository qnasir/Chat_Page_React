import { Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContext } from '../../Context/ParentContext'
import { CaretLeft } from 'phosphor-react'
import ProfileForm from './ProfileForm'

const Profile = () => {

    const {isToggled} = useContext(AppContext)

  return (
    <>
        <Stack direction="row" sx={{ width: "100%" }} >
        <Box sx={{ height: "100vh", position: "relative", width: 312, backgroundColor: isToggled ? "#F8FAFF" : "#171A21", boxShadow: "0px 0px 2px rgba(0, 0, 0, 025)" }}>

            <Stack p={4} spacing={5}>
                {/* Header */}
                <Stack direction="row" alignItems={"center"} spacing={3}>
                    <IconButton>
                        <CaretLeft size={24} color="#4B4B4B" />
                    </IconButton>
                    <Typography variant='h5' >Profile</Typography>
                </Stack>

                {/* Profile Form */}
                <ProfileForm />

            </Stack>
        </Box>

        </Stack>
    </>
  )
}

export default Profile