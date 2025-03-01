import { Stack, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function RHFCodes({ keyName = '', inputs = [], ...other }) {
    const { control, setValue } = useFormContext();
    const codesRef = useRef(null);

    const handleChangeWithNextField = (event, handleChange, index) => {
        const { maxLength, value } = event.target;
        const nextField = document.querySelector(`input[name=${keyName}${index + 2}]`);

        // Allow only one character
        if (value.length > maxLength) {
            event.target.value = value[0];
        }

        // Move to next field if value is entered
        if (value.length >= maxLength && nextField) {
            nextField.focus();
        }

        handleChange(event);
    };

    const handleBackspace = (event, index) => {
        if (event.key === "Backspace" && event.target.value === "") {
            const prevField = document.querySelector(`input[name=${keyName}${index}]`);
            if (prevField) {
                setValue(`${keyName}${index + 1}`, ""); // Clear current box
                prevField.focus(); // Move to previous box
            }
        }
    };

    return (
        <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
            {inputs.map((name, index) => (
                <Controller
                    key={name}
                    name={`${keyName}${index + 1}`}
                    control={control}
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            error={!!error}
                            autoFocus={index === 0}
                            placeholder="_"
                            onChange={(event) => handleChangeWithNextField(event, field.onChange, index)}
                            onKeyDown={(event) => handleBackspace(event, index)}
                            onFocus={(event) => event.currentTarget.select()}
                            InputProps={{
                                sx: {
                                    width: { xs: 36, sm: 56 },
                                    height: { xs: 36, sm: 56 },
                                    '& input': { p: 0, textAlign: "center" },
                                },
                            }}
                            inputProps={{
                                maxLength: 1,
                            }}
                            {...other}
                        />
                    )}
                />
            ))}
        </Stack>
    );
}
