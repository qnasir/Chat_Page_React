import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackbar } from "./app";

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    token: "",
    error: null,
    email: "",
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.isLoading = false;
            state.error = null;
        },
        signOut(state) {
            state.isLoggedIn = false;
            state.token = "";
            state.isLoading = false;
            state.error = null;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email
        }
    }
});

export const { logIn, signOut, setLoading, setError, updateRegisterEmail } = slice.actions;

export default slice.reducer;

export function loginUser(formValues) {

    return async dispatch => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("/auth/login", formValues, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            dispatch(logIn({
                isLoggedIn: true,
                token: response.data.token
            }));

            window.localStorage.setItem("user_id", response.data.user_id);

            dispatch(showSnackbar({
                severity: "success",
                message: response.data.message,
            }))
        } catch (error) {
            console.error("Login error:", error.response.data.message);
            dispatch(showSnackbar({
                severity: "error",
                message: `${error.response.data.message}`
            }))
            dispatch(setError("Failed to log in"));
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function LogoutUser() {
    return async (dispatch, getState) => {
        window.localStorage.removeItem("user_id");
        dispatch(signOut())
    }
}

export function ForgotPassword(formValues) {

    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("/auth/forgot-password", formValues, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            dispatch(showSnackbar({
                severity: "success",
                message: response.data.message
            }))
        } catch (error) {
            dispatch(showSnackbar({
                severity: "error",
                message: `${error.response.data.message}`
            }))
            dispatch(setError("Failed to reset password"))
        }  finally {
            dispatch(setLoading(false));
        }
    }
}

export function NewPassword(formValues) {

    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("/auth/reset-password", formValues, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Response", response)
            dispatch(logIn({
                isLoggedIn: true,
                token: response.data.token
            }));
            dispatch(showSnackbar({
                severity: "success",
                message: response.data.message,
            }))
        } catch (error) {
            console.log(error)
            dispatch(showSnackbar({
                severity: "error",
                message: `${error.response.data.message}`
            }))
            dispatch(setError('Failed to set new password'))
        }
    }
}

export function RegisterUser(formValues) {
    console.log("Form ", formValues)
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try {
            const response = await axios.post("/auth/register", formValues, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch(updateRegisterEmail({ email: formValues.email }));
            dispatch(setLoading(false));
            dispatch(setError(false));
            if (!getState().auth.error) {
                const email = encodeURIComponent(formValues.email);
                window.location.href = `/auth/verify?email=${email}`;
            }
        } catch (error) {
            console.log(error)
            dispatch(showSnackbar({
                severity: "error",
                message: `${error.response.data.message}`
            }))
            dispatch(setError("Failed to register"))
        }
    }
}

export function VerifyEmail(formValues) {
   
    return async (dispatch, getState) => {

        dispatch(setLoading(true));
        try {
            const response = await axios.post("/auth/verify", formValues, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch(logIn({
                isLoggedIn: true,
                token: response.data.token
            }));

            window.localStorage.setItem("user_id", response.data.user_id);
            dispatch(showSnackbar({
                severity: "success",
                message: response.data.message,
            }))
        } catch (error) {
            console.log(error)
            dispatch(showSnackbar({
                severity: "error",
                message: `${error.response.data.message}`
            }))
            dispatch(setError("Failed to verify"))
        }
    }
}
