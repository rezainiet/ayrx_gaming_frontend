import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, dispatch]);

    return socket;
};

export default useGetRealTimeMessage;
