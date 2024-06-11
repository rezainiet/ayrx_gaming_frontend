import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, MailOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const MobileMenu = ({ authUser, current, handleClick, handleLogout }) => {
    return (
        <>
            <SearchBar />
            <Menu onClick={handleClick} selectedKeys={[current]} mode="vertical" theme="light">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="games" icon={<HomeOutlined />}>
                    <Link to="/games">Games</Link>
                </Menu.Item>
                <Menu.Item key="terms" icon={<HomeOutlined />}>
                    <Link to="/terms-and-condition">Terms & Conditions</Link>
                </Menu.Item>
                {authUser ? (
                    <>
                        <Menu.Item key="profile" icon={<UserOutlined />}>
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
                            Log out
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="login" icon={<LoginOutlined />}>
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="register" icon={<UserAddOutlined />}>
                            <Link to="/register">Register</Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </>
    );
};

export default MobileMenu;
