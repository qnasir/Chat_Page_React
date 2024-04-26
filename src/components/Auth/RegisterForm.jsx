import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import FormProvider from './hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from './hook-form'
import { Stack } from '@mui/system'
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    })

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "demo575@gmail.com",
        password: "demo@1234"
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
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
                <Stack spacing={1}>
                    <Stack>
                        {!!errors.afterSubmit && <Alert severity='error' >{errors.afterSubmit.message}</Alert>}
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} >

                        <RHFTextField name="firstName" label="First Name" />
                        <RHFTextField name="lastName" label="Last Name" />

                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <RHFTextField name="email" label="Email address" />

                    <RHFTextField name="password" label="Password" type={showPassword ? "text" : "password"} InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
                </Stack>

                <Button fullWidth color='inherit' size='large' type='submit' variant='contained' sx={{
                    bgcolor: 'text.primary', color: "#fff", '&:hover': {
                        color: "#000"
                    }
                }} >
                    Create Account
                </Button>

            </Stack>
        </FormProvider >

    )
}

export default RegisterForm