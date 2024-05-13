import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user)
    const setSelectedUserHandler = (user) => {
        console.log(user);
        dispatch(setSelectedUser(user))
    };
    return (
        <>
            <div onClick={() => setSelectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-sky-300 text-white' : 'bg-zinc-200'} flex gap-2 items-center hover:bg-sky-300 rounded-sm p-2 cursor-pointer hover:text-white`}>
                <div className='avatar online'>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user avatar" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2'>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser