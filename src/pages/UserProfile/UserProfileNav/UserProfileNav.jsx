import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import PostForm from '../../ProfilePage/ProfileNav/PostForm';
import Projects from './Projects';
import MyAppointments from './MyAppointments/MyAppointments';

const UserProfileNav = ({ userId }) => {
    const [currentSection, setCurrentSection] = useState('project');

    const handleMenuClick = e => {
        setCurrentSection(e.key);
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'project':
                return <Projects userId={userId} />;
            // case 'expertise':
            //     return <h1>Expertise section</h1>;
            case 'booking':
                return <MyAppointments userId={userId} />;
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
                    <Menu.Item key="project">Services I Offer</Menu.Item>
                    {/* <Menu.Item key="expertise">Expertise</Menu.Item> */}
                    <Menu.Item key="booking">Upcoming Appointments</Menu.Item>
                </Menu>
            </Col>
            <Col xs={24} lg={24}>
                {renderSection()}
            </Col>
        </Row>
    );
};

export default UserProfileNav;