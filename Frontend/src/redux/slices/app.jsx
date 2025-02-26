
// slices/app.jsx
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: false,
        message: "",
        severity: "info",
    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload;
        },
        openSnackbar(state, action) {
            state.snackbar.open =  true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open =  false;
            state.snackbar.severity = "info";
            state.snackbar.message = "";
        },
        updateUsers(state, action) {
            state.users = action.payload.users;
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.request;
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
        restoreState(state, action) {
            return {...initialState, ...state};
        }
    }
});

export const { restoreState, toggleSidebar, selectConversation, updateSidebarType, openSnackbar, closeSnackbar, updateUsers, updateFriends, updateFriendRequests } = appSlice.actions;
export default appSlice.reducer;

export function showSnackbar({ severity, message }) {
    return async (dispatch, getState) => {
        try {
            dispatch(openSnackbar({
                message,
                severity,
            })
        );

        setTimeout(() => {
            dispatch(closeSnackbar())
        }, 4000)
        } catch (error) {
            console.log("Snackbar Error: ", error)
        }

    }

}

export const FetchUsers = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        try {
            const response = await axios.get("/user/get-users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(updateUsers({ users: response.data.data }))
        } catch (error) {
            console.log("Fetching Users Error", error)
        }
    

    }
}

export const FetchFriends = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then((response) => {
            console.log(response)
            dispatch(updateFriends({ friends: response.data.data }))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const FetchFriendRequest = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`
            }
        }).then((response) => {
            console.log(response)
            dispatch(updateFriendRequests({ request: response.data.data }))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const SelectConversation = ({room_id}) => {
    return (dispatch, getState) => {
        dispatch(selectConversation({room_id}));
    }
}
