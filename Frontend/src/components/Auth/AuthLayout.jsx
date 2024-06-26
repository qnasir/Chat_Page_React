import { Container, Stack } from '@mui/material'
import Logo from '../../assets/logo.png'
import AllRoutes from '../../routes/AllRoutes'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

 const isAuthenticated = true

const AuthLayout = () => {

  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/app" />
  }

  return (
    <>
        <Container sx={{ mt: 5 }} maxWidth="sm" >
            <Stack spacing={5}>
                <Stack sx={{ width: "100%" }} direction="column" alignItems={"center"} >
                    <img style={{ height: 180, width: 230 }} src={Logo} alt={"Logo"} />
                </Stack>
            </Stack>
            <AllRoutes />
        </Container>
    </>
  )
}

export default AuthLayout