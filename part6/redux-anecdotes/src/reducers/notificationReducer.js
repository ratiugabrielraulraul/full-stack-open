import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state
        },
        clearNotification: () => null
    }

})
export const setTimedNotification = (message, durationInSeconds) => {
    return (dispatch) => {
        dispatch(setNotification(message));

        // Clear the notification after the specified duration
        setTimeout(() => {
            dispatch(clearNotification());
        }, durationInSeconds * 1000); // Convert seconds to milliseconds
    };
};


export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer