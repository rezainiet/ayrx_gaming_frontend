import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, InfoCircleOutlined, MailOutlined, LoginOutlined, UserAddOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import { useSelector } from 'react-redux';

const { Header } = Layout;

const Navbar = () => {
    const { authUser } = useSelector(store => store.user);
    const [signOut] = useSignOut(auth);
    const [current, setCurrent] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = (e) => {
        setCurrent(e.key);
        setMenuOpen(false); // Hide menu on item click
    };

    return (
        <Header className="bg-white  sticky top-0 w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-8 py-2">
                <div className="text-sky-500 text-2xl font-black">AYRX</div>
                <div className="lg:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuOutlined />
                </div>
                <div className={`lg:flex lg:items-center lg:space-x-4 ${menuOpen ? 'block' : 'hidden'} w-full lg:w-auto backdrop-filter -mt-2 backdrop-blur-lg bg-opacity-30`}>
                    <Menu
                        onClick={handleClick}
                        selectedKeys={[current]}
                        mode={menuOpen ? 'vertical' : 'horizontal'}
                        theme="light"
                        className="lg:flex lg:items-center w-full lg:w-auto backdrop-filter backdrop-blur-lg bg-opacity-30"
                    >
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to={'/'}>Home</Link>
                        </Menu.Item>
                        <Menu.Item key="chat" icon={<HomeOutlined />}>
                            <Link to={'/games'}>Games</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="members" icon={<UsergroupAddOutlined />}>
                            Members
                        </Menu.Item> */}
                        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
                            About Us
                        </Menu.Item>
                        <Menu.Item key="contact" icon={<MailOutlined />}>
                            Contact Us
                        </Menu.Item>
                        {authUser ? (
                            <>
                                <Menu.Item key="profile" icon={<UserOutlined />}>
                                    <Link to={'/profile'}>Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="logout" onClick={async () => {
                                    const success = await signOut();
                                    if (success) {
                                        alert('You are signed out');
                                    }
                                }} icon={<LoginOutlined />}>
                                    Log out
                                </Menu.Item>
                            </>
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
                    </Menu>
                </div>
            </div>
        </Header>
    );
};

export default Navbar;
