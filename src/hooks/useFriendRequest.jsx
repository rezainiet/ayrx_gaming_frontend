import { useState } from 'react';
import axios from 'axios';

const useFriendRequest = (initialIsSentRequest, initialIsReceivedRequest) => {
    const [isSentRequest, setIsSentRequest] = useState(initialIsSentRequest);
    const [isReceivedRequest, setIsReceivedRequest] = useState(initialIsReceivedRequest);

    const sendFriendRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/user/sendFriendRequest`, { userId });
            setIsSentRequest(true);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const cancelFriendRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/user/cancelFriendRequest`, { userId });
            setIsSentRequest(false);
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    const acceptFriendRequest = async (userId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/user/acceptFriendRequest`, { userId });
            setIsReceivedRequest(false);
            setIsSentRequest(false); // Assuming the request is moved to friends list
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    return { isSentRequest, sendFriendRequest, cancelFriendRequest, acceptFriendRequest };
};

export default useFriendRequest;
