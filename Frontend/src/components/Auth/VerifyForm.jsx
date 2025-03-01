import React, { useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import FormProvider from './hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/system'
import { Button, CircularProgress  } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { VerifyEmail } from '../../redux/slices/auth'
import RHFCodes from './hook-form/RHFCodes'

const VerifyForm = () => {

    const [queryParameters] = useSearchParams();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email)

    const [isVerifying, setIsVerifying] = useState(false);

    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.string().required("Code is required"),
        code2: Yup.string().required("Code is required"),
        code3: Yup.string().required("Code is required"),
        code4: Yup.string().required("Code is required"),
        code5: Yup.string().required("Code is required"),
        code6: Yup.string().required("Code is required"),
    })

    const defaultValues = {
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
    }

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = methods

    const onSubmit = async (data) => {
        console.log("Hello")
        setIsVerifying(true);
        // return
        try {
            //submit data to backend
            await dispatch(VerifyEmail({
                email,
                otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
            }));

        } catch (error) {
            console.log(error)
            reset()
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        } finally {
            setIsVerifying(false);
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >

            <Stack spacing={3}>
                {/* {!!errors.afterSubmit && <Alert severity='error' >{errors.afterSubmit.message}</Alert>} */}

                {/* Custom OTP Input */}
                <RHFCodes keyName="code" inputs={["code1", "code2", "code3", "code4", "code5", "code6"]} />

                <Button fullWidth color='inherit' size='large' type='submit' variant='contained' sx={{
                    bgcolor: 'text.primary', color: "#fff", '&:hover': {
                        color: "#000"
                    }
                }} startIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : null} >
                    {isVerifying ? "Verifying..." : "Verify"}
                </Button>

            </Stack>

        </FormProvider>
    )
}

export default VerifyForm