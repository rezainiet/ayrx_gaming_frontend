import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, []);

    const formatMessageTime = (createdAt) => {
        const messageTime = new Date(createdAt);
        const currentTime = new Date();

        const timeDifference = Math.abs(currentTime - messageTime);
        if (timeDifference < 60 * 1000) {
            return 'Just now';
        } else if (timeDifference < 60 * 60 * 1000) {
            return `${Math.floor(timeDifference / (60 * 1000))} minute${Math.floor(timeDifference / (60 * 1000)) > 1 ? 's' : ''} ago`;
        } else {
            return formatDistanceToNow(messageTime, { addSuffix: true });
        }
    };

    return (
        <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Profile" src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">{formatMessageTime(message?.createdAt)}</time>
            </div>
            <div className={`chat-bubble ${authUser?._id === message?.senderId ? 'chat-bubble-accent text-white' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
}

export default Message;
