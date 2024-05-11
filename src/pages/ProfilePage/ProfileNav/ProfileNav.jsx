import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import PostForm from './PostForm';

const ProfileNav = () => {
    const [currentSection, setCurrentSection] = useState('post');

    const handleMenuClick = e => {
        setCurrentSection(e.key);
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'post':
                return <PostForm />;
            case 'expertise':
                return <h1>Expertise section</h1>;
            case 'booking':
                return <h1>Booking Section</h1>;
            default:
                return null;
        }
    };

    return (
        <Row gutter={[16, 16]} align="top" className='bg-bg_color py-3'>
            <Col xs={24} lg={24}>
                <Menu
                    className='flex overflow-x-auto rounded-md'
                    mode="inline"
                    selectedKeys={[currentSection]}
                    onClick={handleMenuClick}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="post">Posts</Menu.Item>
                    <Menu.Item key="expertise">Expertise</Menu.Item>
                    <Menu.Item key="booking">Booking</Menu.Item>
                </Menu>
            </Col>
            <Col xs={24} lg={18}>
                {renderSection()}
            </Col>
        </Row>
    );
};

export default ProfileNav;
