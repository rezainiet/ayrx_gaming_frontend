import React, { useState } from 'react';
import { Layout, Button, Drawer, Divider } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import './Navbar.css'; // Custom CSS for styles

const { Header } = Layout;

const Navbar = () => {
    const { authUser } = useSelector((store) => store.user);
    const [signOut] = useSignOut(auth);
    const [current, setCurrent] = useState('home');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
        const success = await signOut();
        if (success) {
            alert('You are signed out');
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
