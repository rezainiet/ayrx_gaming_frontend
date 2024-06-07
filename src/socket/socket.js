// socket.js
import io from 'socket.io-client';

let socket;

export const initializeSocket = (userId) => {
    // socket = io('http://localhost:4000', {
    socket = io('http://localhost:4000', {
        transports: ['websocket'],
        withCredentials: true,
        query: { userId },
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
