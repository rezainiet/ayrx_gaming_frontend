import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    console.log(selectedUser?._id)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:4000/api/v1/message/${selectedUser?._id}`);
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        };
        fetchMessages();
    }, [selectedUser])
}

export default useGetMessages;