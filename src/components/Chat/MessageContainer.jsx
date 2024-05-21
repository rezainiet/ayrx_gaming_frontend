import React, { useEffect } from 'react';
import { Avatar, Divider, Empty } from 'antd';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            {/* <Avatar size={64} src={selectedUser?.profilePhoto} /> */}
                            <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt={selectedUser?.fullName} />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                        <h1 className='text-3xl font-medium'>Hi, {authUser?.fullName} 👋</h1>
                        <h1 className='text-xl font-medium'>Let's start a conversation...</h1>
                    </div>
                )
            }
        </>
    );
};

export default MessageContainer;
