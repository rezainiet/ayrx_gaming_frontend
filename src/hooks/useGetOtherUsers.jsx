import { useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user`);
                dispatch(setOtherUsers(res.data))
            } catch (error) {
                // console.log(error)
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers