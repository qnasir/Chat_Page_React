
// slices/app.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: null,
        message: null,
        severity: null,
    }
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
            console.log(action.payload)
            state.snackbar.open =  true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open =  false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
        }
    }
});

export const { toggleSidebar, updateSidebarType, openSnackbar, closeSnackbar } = appSlice.actions;
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
        }, [4000])
        } catch (error) {
            console.log(error)
        }

    }

}

