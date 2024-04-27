import React, { forwardRef } from 'react'
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import  CreateGroupForm from './CreateGroupForm'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroup = ({ open, handleClose }) => {

    return (
        <>
            <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{p: 4}} >

                {/* Title */}
                <DialogTitle sx={{ mb: 2 }}>Create New Group</DialogTitle>

                {/* Content */}
                <DialogContent>
                    {/* Form */}
                    <CreateGroupForm handleClose={handleClose} />
                </DialogContent>

            </Dialog>
        </>
    )
}

export default CreateGroup