import { Divider } from 'antd'
import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import OtherUsers from './OtherUsers'
import { Button, message, Popconfirm } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const confirm = async (e) => {
        console.log(e);
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/user/logout`);
            message.success('Logout successful.');
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form action="" className='flex items-center gap-2'>
                <input type="text"
                    className='input input-bordered rounded-md'
                    placeholder='Search...'
                />
                <button className='btn bg-zinc-500' type='submit'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </form>
            <div className="divider px-3"></div>
            <OtherUsers />
            <div>
                <Popconfirm
                    title="Logout now"
                    description="Are you sure want to logout?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<LogoutOutlined />}>Logout</Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default SideBar