import React, { useState } from 'react';
import { Divider, Input, Button, message, Popconfirm, Form } from 'antd';
import { BiSearchAlt2 } from 'react-icons/bi';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../../redux/userSlice';
import { setMessages } from '../../redux/messageSlice';
import OtherUsers from './OtherUsers';
import toast from 'react-hot-toast';

const SideBar = () => {
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/logout`);
            message.success('Logout successful.');
            dispatch(setSelectedUser(null));
            dispatch(setOtherUsers(null));
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            message.error('Failed to logout. Please try again later.');
        }
    };

    const handleLogoutCancel = () => {
        message.error('Logout canceled.');
    };


    // search bar
    const onFinish = () => {
        const searchedUser = otherUsers?.find((user) => user?.fullName?.toLowerCase()?.includes(search.toLowerCase()))
        if (searchedUser) {
            dispatch(setOtherUsers([searchedUser]));
            // Reset search field after successful search
            setSearch("");
        } else {
            toast.error('User not found!');
        }
    };

    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <Form onFinish={onFinish} className="flex items-center gap-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-md"
                    placeholder="Search..."
                    prefix={<BiSearchAlt2 className="outline-none" />}
                />
                <Button htmlType="submit" className='btn btn-sm btn-secondary'>Search</Button>
            </Form>
            <Divider />
            <OtherUsers />
            <div>
                <Popconfirm
                    title="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                    onCancel={handleLogoutCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<LogoutOutlined />}>Logout</Button>
                </Popconfirm>
            </div>
        </div>
    );
};

export default SideBar;
