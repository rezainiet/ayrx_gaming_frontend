import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { HomeOutlined, InfoCircleOutlined, MailOutlined, LoginOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DesktopMenu = ({ authUser, current, handleClick, handleLogout }) => {
    const userMenu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to={'/profile'}>
                    <UserOutlined /> Profile
                </Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                <LogoutOutlined /> Log out
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="menu-desktop">
            <Menu
                onClick={handleClick}
                selectedKeys={[current]}
                mode="horizontal"
                theme="light"
                className="desktop-menu"
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="games" icon={<HomeOutlined />}>
                    <Link to="/games">Games</Link>
                </Menu.Item>
                <Menu.Item key="terms" icon={<HomeOutlined />}>
                    <Link to="/terms-and-condition">Terms & C.</Link>
                </Menu.Item>
                {authUser ? (
                    <Menu.Item key="user" className="user-menu">
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <div className="avatar-dropdown">
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                <span className="username">{authUser.displayName}</span>
                            </div>
                        </Dropdown>
                    </Menu.Item>
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
        </div>
    );
};

export default DesktopMenu;
