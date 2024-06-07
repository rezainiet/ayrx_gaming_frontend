import axios from 'axios';
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message); // Ensure messages is initialized as an array

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://www.api.onlyhumanity.co.uk/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });


            // console.log(res.data.newMessage);
            // console.log(...messages);
            if (!messages) {
                dispatch(setMessages([res?.data?.newMessage]));
            }
            else {
                dispatch(setMessages([...messages, res?.data?.newMessage]));

            }
            // console.log(messages)
        } catch (error) {
            // console.log(error)
        }
        setMessage('');
    };

    return (
        <form onSubmit={onSubmitHandler} className='px-3 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='input border text-sm rounded-lg block w-full bg-gray-600 text-white'
                />
                <button type='submit' className='absolute flex items-center inset-y-0 end-0  pr-4' >
                    <IoSend />
                </button>
            </div>
        </form>
    );
}

export default SendInput;
