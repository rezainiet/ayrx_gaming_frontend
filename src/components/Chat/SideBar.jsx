import React, { useState } from 'react';
import { Divider, Input, Button, message, Popconfirm } from 'antd';
import { BiSearchAlt2 } from 'react-icons/bi';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../../redux/userSlice';
import { setMessages } from '../../redux/messageSlice';
import OtherUsers from './OtherUsers';

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleLogout = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/user/logout`);
            message.success('Logout successful.');
            dispatch(setSelectedUser(null));
            dispatch(setOtherUsers(null));
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogoutCancel = () => {
        message.error('Logout canceled.');
    };


    const searchSubmitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-md"
                    placeholder="Search..."
                    prefix={<BiSearchAlt2 className="outline-none" />}
                />
                <Button type="submit" className='btn btn-sm btn-secondary'>Search</Button>
            </form>
            <Divider />
            <OtherUsers />
            <div>
                <Popconfirm
                    title="Logout now"
                    description="Are you sure you want to logout?"
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
