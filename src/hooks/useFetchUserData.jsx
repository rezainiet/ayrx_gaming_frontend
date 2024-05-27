import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUserData = (userId) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:4000/api/v1/user/getUserDataById/${userId}`);
                const { user: userData, authUserId } = res.data;

                console.log("Fetched user data:", userData);
                console.log("Fetched auth user ID:", authUserId);

                // Determine if the user is a friend
                const isFriend = userData.friends.includes(authUserId);
                const isSentRequest = userData.receivedRequests.includes(authUserId);
                const isReceivedRequest = userData.sentRequests.includes(authUserId);
                console.log("Is Friend:", isFriend, "Is Sent Request:", isSentRequest, "Is Received Request:", isReceivedRequest);

                setUser({ ...userData, isFriend, isSentRequest, isReceivedRequest });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return { user, loading };
};

export default useFetchUserData;
