import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import AuthSocials from './AuthSocials'
import LoginForm from './LoginForm'
import { Link as RouterLink } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Login to Tawk</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant='body2'> New User?</Typography>
          <Link component={RouterLink} variant="subtitle2" to="/auth/register" >Create an account</Link>
        </Stack>

        {/* Login Form */}
        <LoginForm />

        {/* Auth Socials */}
        <AuthSocials />

      </Stack>
    </>
  )
}

export default Login