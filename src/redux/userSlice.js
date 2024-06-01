// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: [],
        selectedUser: null,
        onlineUsers: []
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        moveUserToTop: (state, action) => {
            const userId = action.payload;
            const userIndex = state.otherUsers.findIndex(user => user._id === userId);
            if (userIndex !== -1) {
                const [user] = state.otherUsers.splice(userIndex, 1);
                state.otherUsers.unshift(user);
            }
        }
    }
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, moveUserToTop } = userSlice.actions;
export default userSlice.reducer;
