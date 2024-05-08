import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, InfoCircleOutlined, MailOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';

const { Header } = Layout;

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
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
                        <Link to={'/'}>Home</Link>
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
                    {user ? (
                        <Menu.Item key="logout" onClick={async () => {
                            const success = await signOut();
                            if (success) {
                                alert('You are signed out');
                            }
                        }} icon={<LoginOutlined />}>
                            Log out
                        </Menu.Item>
                    ) : (
                        <>
                            <Menu.Item key="login" icon={<LoginOutlined />}>
                                <Link to={'/login'}>Login</Link>
                            </Menu.Item>
                            <Menu.Item key="register" icon={<UserAddOutlined />}>
                                <Link to={'/register'}>Register</Link>
                            </Menu.Item>
                        </>
                    )}
                    {user && (
                        <Menu.Item key="profile" icon={<UserOutlined />}>
                            <Link to={'/profile'}>Profile</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </div>
        </Header>
    );
};

export default Navbar;
