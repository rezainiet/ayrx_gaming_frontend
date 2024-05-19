// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Ensure this is the correct import
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import socketReducer from './socketSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
