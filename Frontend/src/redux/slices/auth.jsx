import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    error: null
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
        }
    }
});

export const { logIn, signOut, setLoading, setError } = slice.actions;

export default slice.reducer;

export function loginUser(formValues) {
    console.log("data", formValues)

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
        } catch (error) {
            console.error("Login error:", error);
            dispatch(setError("Failed to log in"));
        } finally {
            dispatch(setLoading(false));
        }
    }
}