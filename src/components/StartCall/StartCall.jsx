import { Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React, { forwardRef, useContext } from 'react'
import Search from '../Search/Search';
import { faker } from '@faker-js/faker';
import SearchIconWrapper from '../Search/SearchIconWrapper';
import { MagnifyingGlass } from 'phosphor-react';
import StyledInputBase from '../Search/StyledInputBase';
import { AppContext } from '../../Context/ParentContext';
import { CallElemnt } from '../Call/CallElements';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MemberList = [
    {
        id: 0,
        img: faker.image.avatar(),
        name: faker.name.fullName(),
        online: true,
    },
    {
        id: 1,
        img: faker.image.avatar(),
        name: faker.name.fullName(),
        online: false,
    },
    {
        id: 2,
        img: faker.image.avatar(),
        name: faker.name.fullName(),
        online: true,
    },
    {
        id: 3,
        img: faker.image.avatar(),
        name: faker.name.fullName(),
        online: true,
    },
    {
        id: 4,
        img: faker.image.avatar(),
        name: faker.name.fullName(),
        online: false,
    },
]

const StartCall = ({ open, handleClose }) => {

    const { isToggled } = useContext(AppContext)

    return (
        <>
            <Dialog fullWidth maxWidth="xs" open={open} TransitionComponent={Transition} keepMounted sx={{ p: 4 }} onClose={handleClose} >
                {/* Title */}
                <DialogTitle sx={{ mb: 2 }}>Start Call</DialogTitle>

                {/* Content */}
                <DialogContent>
                    {/* Start  Call */}
                    <Stack spacing={3}>
                        <Stack width={"100%"}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color={isToggled ? "#709CE6" : "grey"} />
                                </SearchIconWrapper>
                                <StyledInputBase sx={{ color: isToggled ? "#36454F" : "	#fff", backgroundColor: isToggled ? "#EBF1FF" : "#1F2631", borderRadius: 20 }} placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                            </Search>
                        </Stack>

                        {/* Call List */}
                        {MemberList.map((el) => <CallElemnt {...el} />)}
                    </Stack>

                </DialogContent>
            </Dialog>

        </>
    )
}

export default StartCall