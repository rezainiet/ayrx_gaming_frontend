// socket.js
import io from 'socket.io-client';

let socket;

export const initializeSocket = (userId) => {
    // socket = io('https://www.api.onlyhumanity.co.uk', {
    socket = io('https://www.api.onlyhumanity.co.uk', {
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
