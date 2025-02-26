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
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload;
        },
        openSnackbar(state, action) {
            state.snackbar = {
                open: true,
                severity: action.payload.severity || "info",
                message: action.payload.message || "",
            };
        },
        closeSnackbar(state) {
            state.snackbar = {
                open: false,
                severity: "info",
                message: "",
            };
        },
        updateUsers(state, action) {
            state.users = action.payload.users || [];
        },
        updateFriends(state, action) {
            state.friends = action.payload.friends || [];
        },
        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.requests || [];
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;
        },
    },
});

export const {
    toggleSidebar,
    selectConversation,
    updateSidebarType,
    openSnackbar,
    closeSnackbar,
    updateUsers,
    updateFriends,
    updateFriendRequests,
} = appSlice.actions;

export default appSlice.reducer;

// ✅ Show Snackbar with Auto Close
export const showSnackbar = ({ severity, message }) => async (dispatch) => {
    try {
        dispatch(openSnackbar({ severity, message }));

        setTimeout(() => {
            dispatch(closeSnackbar());
        }, 4000); // ✅ Correct timeout syntax
    } catch (error) {
        console.error("Snackbar Error:", error);
    }
};

// ✅ Fetch Users
export const FetchUsers = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
        const response = await axios.get("/user/get-users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(updateUsers({ users: response.data.data }));
    } catch (error) {
        console.error("Fetching Users Error:", error);
    }
};

// ✅ Fetch Friends
export const FetchFriends = () => async (dispatch, getState) => {
    try {
        const response = await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        });
        dispatch(updateFriends({ friends: response.data.data }));
    } catch (error) {
        console.error("Fetching Friends Error:", error);
    }
};

// ✅ Fetch Friend Requests
export const FetchFriendRequest = () => async (dispatch, getState) => {
    try {
        const response = await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        });
        dispatch(updateFriendRequests({ requests: response.data.data }));
    } catch (error) {
        console.error("Fetching Friend Requests Error:", error);
    }
};

//
