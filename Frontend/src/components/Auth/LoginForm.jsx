import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import FormProvider from './hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from './hook-form'
import { Stack } from '@mui/system'
import { Alert, Button, IconButton, InputAdornment, Link, CircularProgress } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Eye, EyeSlash } from 'phosphor-react'
import { useDispatch } from "react-redux"
import { loginUser } from '../../redux/slices/auth'
import { connectSocket } from '../../socket'

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        connectSocket("Some_user_id", (status) => {
            setIsSocketConnected(status);
        })
    }, [])
    
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    })

    const defaultValues = {
        email: "qnasir575@gmail.com",
        password: "demo@1234"
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting } } = methods

    const onSubmit = async (data) => {
        if (!isSocketConnected) return;
        try {
            //submit data to backend
            await dispatch(loginUser(data))
        } catch (error) {
            console.log(error)
            reset()
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >

        <Stack spacing={3} >
            {!!errors.afterSubmit && <Alert severity='error' >{errors.afterSubmit.message}</Alert>}

            {!isSocketConnected && (
                <Alert severity='warning'>
                    Connecting to server... Please wait before loggin in.
                </Alert>
            )}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField name="password" label="Password" type={showPassword ? "text" : "password" } InputProps={{
            endAdornment: (
                <InputAdornment>
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                </InputAdornment>
            )
        }} />

        </Stack>

        <Stack alignItems={"flex-end"} sx={{ my: 2 }} >
            <Link component={RouterLink} to="/auth/reset-password" variant="body2" color='inherit' underline="always" >Forgot Password</Link>
        </Stack>

        <Button fullWidth color='inherit' size='large' type='submit' variant='contained' sx={{ bgcolor: 'text.primary', color: "#fff", '&:hover': {
            color: "#000"
        }  }} disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : null} >
            {isSubmitting ? "Logging in..." : !isSocketConnected ? "Waiting for connection..." : "Login"}
        </Button>


    </FormProvider>
  )
}

export default LoginForm