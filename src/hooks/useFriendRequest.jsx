import axios from "axios";
import { useState } from "react";

const useFriendRequest = (
    initialIsSentRequest, initialIsReceivedRequest, setIsSentRequest, setIsReceivedRequest, setIsBlocked, setIsFriend
) => {
    const [isSentRequest, localSetIsSentRequest] = useState(initialIsSentRequest);
    const [isReceivedRequest, localSetIsReceivedRequest] = useState(initialIsReceivedRequest);

    const sendFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/sendFriendRequest`, { userId });
            setIsSentRequest(true);
            localSetIsSentRequest(true);
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const cancelFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/cancelFriendRequest`, { userId });
            setIsSentRequest(false);
            localSetIsSentRequest(false);
        } catch (error) {
            console.error("Error canceling friend request:", error);
        }
    };

    const acceptFriendRequest = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/acceptFriendRequest`, { userId });
            setIsReceivedRequest(false);
            localSetIsReceivedRequest(false);
            setIsSentRequest(false);
            setIsFriend(true);
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    const blockUser = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/blockUser`, { userId });
            setIsBlocked(true);
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };

    const unBlockUser = async (userId) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/user/unBlockUser`, { userId });
            setIsBlocked(false);
        } catch (error) {
            console.error("Error unblocking user:", error);
        }
    };

    return { isSentRequest, sendFriendRequest, cancelFriendRequest, acceptFriendRequest, blockUser, unBlockUser };
};

export default useFriendRequest;
