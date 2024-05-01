import { Stack, Typography } from '@mui/material'
import React from 'react'
import VerifyForm from './VerifyForm'

const Verify = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }} >
                <Typography variant='h4'>Please Verify OTP</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant='body2'>Sent to email (qnasir57575@gmail.com)</Typography>
                </Stack>
            </Stack >

            {/* Verify Form */}
            <VerifyForm />

        </>
    )
}

export default Verify