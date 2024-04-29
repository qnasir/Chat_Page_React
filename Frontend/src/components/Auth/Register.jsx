import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthSocials from './AuthSocials'
import RegisterForm from './RegisterForm'

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant='h4'>Get Started With Tawk</Typography>
      </Stack>
      <Stack>
        <Stack direction="row" spacing={0.5}>
          <Typography variant='body2'> Already have  an account?</Typography>
          <Link component={RouterLink} variant="subtitle2" to="/auth/login" >Sign in</Link>
        </Stack>

        {/* Registration Form */}
        <RegisterForm />


        <Typography component={"div"} sx={{ color: "text.secondary", mt: 3 , typography: "caption", textAlign: "center" }} >
          {'By signing up, I agree to '}
          <Link underline='always' color="text.primary">Terms of services</Link>
          {' and '}
          <Link underline='always' color="text.primary">Privacy Policy</Link>
        </Typography>

        {/* Auth Socials */}
        <AuthSocials />

      </Stack>
    </>
  )
}

export default Register