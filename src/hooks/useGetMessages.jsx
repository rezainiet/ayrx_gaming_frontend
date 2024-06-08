import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data));
            } catch (error) {
                dispatch(setMessages(null))
                // console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser, dispatch])
}

export default useGetMessages;