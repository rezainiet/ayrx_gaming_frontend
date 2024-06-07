import React, { useState } from 'react';
import { Layout, Button, Drawer, Divider, message } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import './Navbar.css'; // Custom CSS for styles
import axios from 'axios';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../../../redux/userSlice';
import { setMessages } from '../../../redux/messageSlice';

const { Header } = Layout;

const Navbar = () => {
    const { authUser } = useSelector((store) => store.user);
    const [signOut] = useSignOut(auth);
    const [current, setCurrent] = useState('home');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        setCurrent(e.key);
        setDrawerVisible(false); // Hide drawer on item click
    };

    const handleSearch = (value) => {
        console.log('Search term:', value);
        // Redirect to the search results page
        navigate(`/search?query=${value}`);
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

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
            console.error('Logout error:', error);
            message.error('Failed to logout. Please try again later.');
        }
    };

    return (
        <Header className="navbar-header">
            <div className="container">
                <div className="logo">
                    <Link to="/">Onlyhumanity</Link>
                </div>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                <div className="menu-section">
                    <div className="menu-icon">
                        <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
                    </div>
                    <DesktopMenu authUser={authUser} current={current} handleClick={handleClick} handleLogout={handleLogout} />
                </div>
                <Drawer title="Menu" placement="right" closable={true} onClose={onClose} open={drawerVisible}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} isMobile={true} />
                    <Divider />
                    <MobileMenu authUser={authUser} current={current} handleClick={handleClick} handleLogout={handleLogout} />
                </Drawer>
            </div>
        </Header>
    );
};

export default Navbar;
