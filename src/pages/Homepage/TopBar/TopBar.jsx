import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const TopBar = () => (
    <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Trending</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
        </Menu>
    </Header>
);

export default TopBar;
