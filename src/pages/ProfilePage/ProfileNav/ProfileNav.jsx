import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import PostForm from './PostForm';
import Expertise from './Expertise/Expertise';
import MyAppointments from './Appointments/MyAppointments';

const ProfileNav = () => {
    const [currentSection, setCurrentSection] = useState('post');

    const handleMenuClick = e => {
        setCurrentSection(e.key);
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'post':
                return <PostForm />;
            // case 'expertise':
            //     return <Expertise />;
            case 'booking':
                return <MyAppointments />;
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
                    {/* <Menu.Item key="expertise">Expertise</Menu.Item> */}
                    <Menu.Item key="booking">Appointments</Menu.Item>
                </Menu>
            </Col>
            <Col xs={24} lg={18}>
                {renderSection()}
            </Col>
        </Row>
    );
};

export default ProfileNav;
