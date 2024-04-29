
import * as Yup from 'yup'
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormProvider from '../Auth/hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFAutocomplete, RHFTextField } from '../Auth/hook-form'

const MEMBERS = ["Name 1", "Name 2", "Name 3"]

const CreateGroupForm = ({ handleClose }) => {
    const NewGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, "Must have at least 2members")
    })

    const defaultValues = {
        title: "",
        members: [],
    }

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    })

    const {
        reset,
        watch,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmittingSuccessful, isValid } } = methods

    const onSubmit = async (data) => {
        try {
            // API Call
            console.log("DATA", data)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>
                <RHFTextField name="title" label="Title" />
                <RHFAutocomplete
                    name="members"
                    label="Members"
                    multiple
                    freeSolo
                    options={MEMBERS.map((option) => option)}
                    ChipProps={{ size: "medium" }}
                />
                <Stack spacing={2} direction="row" alignItems={"center"} justifyContent="end">
                    <Button onClick={handleClose} >Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </Stack>
            </Stack>

        </FormProvider>
    )

}

export default CreateGroupForm