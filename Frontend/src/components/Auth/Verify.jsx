import { Stack, Typography } from '@mui/material'
import React from 'react'
import VerifyForm from './VerifyForm'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || "No Email Found";
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }} >
                <Typography variant='h4'>Please Verify OTP</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant='body2'>Sent to email ({email})</Typography>
                </Stack>
            </Stack >

            {/* Verify Form */}
            <VerifyForm />

        </>
    )
}

export default Verify