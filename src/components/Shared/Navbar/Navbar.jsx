import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, InfoCircleOutlined, MailOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
    const [current, setCurrent] = useState('home');

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Header className="bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-sky-500 text-2xl font-black">AYRX</div>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="light">
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="members" icon={<UsergroupAddOutlined />}>
                        Members
                    </Menu.Item>
                    <Menu.Item key="about" icon={<InfoCircleOutlined />}>
                        About Us
                    </Menu.Item>
                    <Menu.Item key="contact" icon={<MailOutlined />}>
                        Contact Us
                    </Menu.Item>
                </Menu>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="light">
                    <Menu.Item key="login" icon={<LoginOutlined />}>
                        <Link to={'/login'}>Login</Link>
                    </Menu.Item>
                    <Menu.Item key="register" icon={<UserAddOutlined />}>
                        <Link to={'/register'}>Register</Link>
                    </Menu.Item>
                    <Menu.Item key="profile" icon={<UserOutlined />}>
                        Profile
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
};

export default Navbar;
