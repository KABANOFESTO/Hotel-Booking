import axios from "axios";
import { userActions } from "./user-slice";

// Handle user Signup
export const getSignUp = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());
        const response = await axios.post("/api/v1/rent/user/signup", user);
        console.log("Signup Response:", response); // Log response
        const data = response.data; // Extract data from response
        dispatch(userActions.getSignupDetails(data.user));
    } catch (error) {
        console.error("Signup Error:", error); // Log error
        dispatch(userActions.getError(error.response ? error.response.data.message : "Unknown error occurred"));
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
        const { data } = await axios.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getError(error.response.data.message))
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

export const forgotPassword = (email) => async (dispatch) => {
    try {
        // Dispatch action to indicate password reset request is being made
        dispatch(userActions.getPasswordRequest());

        // Send a POST request to your server with the user's email to initiate password reset
        await axios.post("/api/v1/rent/user/forgotPassword", { email });

        // Dispatch action to indicate successful password reset request
        dispatch(userActions.getPasswordSuccess(true));

        // Optionally, you can display a success message to the user
        // toast.success("Password reset link has been sent to your email");
    } catch (error) {
        // If an error occurs during the password reset request, dispatch an action with the error message
        dispatch(userActions.getError(error.response.data.message));
    }
};

export const resetPassword = (repassword, token) => async (dispatch) => {
    try {
        await axios.patch(`/api/v1/rent/user/resetPassword/${token}`, repassword);
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
