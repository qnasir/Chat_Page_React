import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import FormProvider from './hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFTextField } from './hook-form';
import { Stack } from '@mui/system';
import { Alert, Button, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("Email must be a valid email address"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "demo575@gmail.com",
        password: "demo@1234"
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const { reset, setError, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        setIsSubmitting(true); // Disable button & show spinner
        try {
            await dispatch(RegisterUser(data));
        } catch (error) {
            console.log(error);
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message
            });
        }
        setIsSubmitting(false); // Re-enable button after submission
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Stack spacing={1}>
                    {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <RHFTextField name="firstName" label="First Name" />
                        <RHFTextField name="lastName" label="Last Name" />
                    </Stack>
                </Stack>

                <Stack spacing={3}>
                    <RHFTextField name="email" label="Email address" />

                    <RHFTextField
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>

                <Button
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: 'text.primary',
                        color: "#fff",
                        '&:hover': {
                            color: "#000"
                        }
                    }}
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default RegisterForm;
