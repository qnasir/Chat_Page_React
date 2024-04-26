import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import FormProvider from './hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from './hook-form'
import { Stack } from '@mui/system'
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Eye, EyeSlash } from 'phosphor-react'

const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    })

    const defaultValues = {
        email: "demo@gmail.com",
        password: "demo@1234"
    }

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        try {
            //submit data to backend
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
        }  }} >
            Login
        </Button>


    </FormProvider>
  )
}

export default LoginForm