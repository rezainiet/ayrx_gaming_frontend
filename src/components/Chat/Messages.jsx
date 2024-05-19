import React from 'react';
import Message from './Message';
import useGetMessages from '../../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);

    // if (!messages) {
    // Return a loading indicator or null if messages are not yet loaded
    // or return a loading spinner, message, etc.
    // return null; 
    // }
    console.log(messages);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {messages && messages?.map(message => (
                <Message key={message?._id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
