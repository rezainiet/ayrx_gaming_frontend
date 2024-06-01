import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveUserToTop } from '../redux/userSlice';

const useSocket = () => {
    const dispatch = useDispatch();
    const socket = useSelector(store => store.socket.socket);

    useEffect(() => {
        if (!socket) return;

        socket.on('userActive', (userId) => {
            dispatch(moveUserToTop(userId));
        });

        return () => {
            socket.off('userActive');
        };
    }, [dispatch, socket]);

    return socket;
};

export default useSocket;
