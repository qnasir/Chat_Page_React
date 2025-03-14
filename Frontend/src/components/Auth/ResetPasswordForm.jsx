import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import FormProvider from './hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { RHFTextField } from './hook-form'
import { Stack } from '@mui/system'
import { Alert, Button, CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'
import { ForgotPassword } from '../../redux/slices/auth'

const ResetPasswordForm = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
    })

    const defaultValues = {
        email: "demo@gmail.com",
    }

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            //submit data to backend
            await dispatch(ForgotPassword(data));

        } catch (error) {
            console.log(error)
            reset()
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >

            <Stack spacing={3} >
                {!!errors.afterSubmit && <Alert severity='error' >{errors.afterSubmit.message}</Alert>}

                <RHFTextField name="email" label="Email address" />

            <Button fullWidth color='inherit' size='large' type='submit' variant='contained' sx={{
                bgcolor: 'text.primary', color: "#fff", '&:hover': {
                    color: "#000"
                }
            }} disabled={isLoading} startIcon={isLoading ? <CircularProgress size={20} color='inherit' /> : null} >
                {isLoading ? "Sending..." : "Send Request"}
            </Button>
            
            </Stack>




        </FormProvider>
    )
}

export default ResetPasswordForm