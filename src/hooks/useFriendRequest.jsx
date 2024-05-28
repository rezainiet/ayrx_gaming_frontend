import axios from "axios";
import { useState } from "react";

const useFriendRequest = (initialIsSentRequest, initialIsReceivedRequest) => {
    const [isSentRequest, setIsSentRequest] = useState(initialIsSentRequest);
    const [isReceivedRequest, setIsReceivedRequest] = useState(initialIsReceivedRequest);
    const [isBlocked, setIsBlocked] = useState(false);

    const sendFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/user/sendFriendRequest`, { userId });
            setIsSentRequest(true);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const cancelFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/user/cancelFriendRequest`, { userId });
            setIsSentRequest(false);
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    const acceptFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/user/acceptFriendRequest`, { userId });
            setIsReceivedRequest(false);
            setIsSentRequest(false); // Assuming the request is moved to friends list
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const blockUser = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/user/blockUser`, { userId });
            setIsBlocked(true);
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };
    const unBlockUser = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/user/unBlockUser`, { userId });
            setIsBlocked(false);
        } catch (error) {
            console.error("Error unblocking user:", error);
        }
    };

    return { isSentRequest, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, blockUser, isBlocked, unBlockUser };
};

export default useFriendRequest;
