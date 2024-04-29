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

const NewPasswordForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const NewPasswordSchema = Yup.object().shape({
        newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
        confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref('newPassword'), null], 'Password must match'),
    })

    const defaultValues = {
        newPassword: "",
        confirmPassword: "",
    }

    const methods = useForm({
        resolver: yupResolver(NewPasswordSchema),
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


        <RHFTextField name="newPassword" label="New Password" type={showPassword ? "text" : "password" } InputProps={{
            endAdornment: (
                <InputAdornment>
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                </InputAdornment>
            )
        }} />

        <RHFTextField name="confirmPassword" label="Confirm Password" type={showPassword ? "text" : "password" } InputProps={{
            endAdornment: (
                <InputAdornment>
                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Eye /> : <EyeSlash />}
                    </IconButton>
                </InputAdornment>
            )
        }} />

        <Button fullWidth color='inherit' size='large' type='submit' variant='contained' sx={{ bgcolor: 'text.primary', color: "#fff", '&:hover': {
            color: "#000"
        }  }} >
            Submit
        </Button>

        </Stack>

    </FormProvider>
  )
}

export default NewPasswordForm