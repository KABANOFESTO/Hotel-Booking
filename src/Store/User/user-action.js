import axios from "axios";
import { userActions } from "./user-slice";

// Handle user Signup
export const getSignUp = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());
        const response = await axios.post("/api/v1/rent/user/signup", user);
        const data = response.data; // Extract data from response
        dispatch(userActions.getSignupDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Handle user login
export const getLogIn = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getLoginRequest());
        const response = await axios.post("/api/v1/rent/user/login", user);
        const data = response.data; // Extract data from response
        dispatch(userActions.getLoginDetails(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Get current user information
export const currentUser = () => async (dispatch) => {
    try {
        dispatch(userActions.getCurrentUserRequest());
        const response = await axios.get("/api/v1/rent/user/me");
        if (response && response.data && response.data.user) {
            dispatch(userActions.getCurrentUser(response.data.user));
        } else {
            dispatch(userActions.getError("User data not available"));
        }
    } catch (error) {
        dispatch(userActions.getError(error.message));
    }
};



// Function to update user information
export const updateUser = (updateUser) => async (dispatch) => {
    try {
        dispatch(userActions.getUpdateUserRequest());
        await axios.patch("/api/v1/rent/user/updateMe", updateUser);
        const response = await axios.get("/api/v1/rent/user/me");
        const data = response.data; // Extract data from response
        if (data && data.user) {
            dispatch(userActions.getCurrentUser(data.user));
        } else {
            dispatch(userActions.getError("User data not available"));
        }
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Function to handle password update
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(userActions.getPasswordRequest());
        await axios.patch("/api/v1/rent/user/updateMyPassword", passwords);
        dispatch(userActions.getPasswordSuccess(true));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

// Function for user logout
export const Logout = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/rent/user/logout");
        dispatch(userActions.getLogout(null));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};
