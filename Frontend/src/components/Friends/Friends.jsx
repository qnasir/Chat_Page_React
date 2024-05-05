import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { FetchFriendRequest, FetchFriends, FetchUsers } from '../../redux/slices/app';
import { FriendComponent, FriendRequestComponent, UserComponent } from '../Friends';

const UsersList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, [])

    const { users } = useSelector((state) => state.app);

    if (!users || users.length === 0) {
        return <div>No users available</div>;
    }

    return (
        <>
            {users.map((el, idx) => {
                // TODO => Render User Component
                return <UserComponent key={el._id}  {...el} />
            })}
        </>
    )
}

const FriendsList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriends());
    }, [])

    const { friends } = useSelector((state) => state.app);

    if (!friends || friends.length === 0) {
        return <div>No friends found</div>;
    }

    return (
        <>
            {friends.map((el, idx) => {
                // Friend Component
                return <FriendComponent key={el._id} {...el} id={el._id} />
            })}
        </>
    )
}

const FriendRequestList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriendRequest());
    }, [])

    const { friendRequests } = useSelector((state) => state.app);

    if (!friendRequests || friendRequests.length === 0) {
        return <div>No friend requests</div>;
    }

    return (
        <>
            {friendRequests.map((el, idx) => {
                //el => {_id, sender: {_id, firstName, lastName, img, online}}
                // Render Friend Request Component
                return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
            })}
        </>
    )
}

const Friends = ({ open, handleClose }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        // <>
        <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose} sx={{
            '& .MuiDialog-paper': {
                borderRadius: '16px',

            }
        }} >
            <Stack pt={2.2} sx={{ width: "100%" }} >
                <Tabs value={value} onChange={handleChange} centered >
                    <Tab label="Explorer" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>

            {/* Dialog Content */}
            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.5} >
                        {(() => {
                            switch (value) {
                                case 0: // display all users
                                    return <UsersList />

                                case 1: // display all friends
                                return <FriendsList />

                                case 2: // display all friend requests
                                return <FriendRequestList />

                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
        // </>
    )
}

export default Friends