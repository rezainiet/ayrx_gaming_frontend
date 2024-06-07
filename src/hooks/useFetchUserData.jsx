import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUserData = (userId) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://www.api.onlyhumanity.co.uk/api/v1/user/getUserDataById/${userId}`);
                const { user: userData, authUserId } = res.data;

                console.log("Fetched user data:", userData);
                console.log("Fetched auth user ID:", authUserId);

                // Determine if the user is a friend
                const isFriend = userData.friends.includes(authUserId);
                const isSentRequest = userData.receivedRequests.includes(authUserId);
                const isReceivedRequest = userData.sentRequests.includes(authUserId);
                const isBlocked = userData.gotBlocked.includes(authUserId);
                const isGotBlocked = userData.blockedUsers.includes(authUserId);

                setUser({ ...userData, isFriend, isSentRequest, isReceivedRequest, isBlocked, isGotBlocked });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return { user, loading, setUser };
};

export default useFetchUserData;
