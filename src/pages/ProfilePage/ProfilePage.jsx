import React from 'react';
import { Layout, Card, Row, Col, Avatar, Typography, Divider, Tag } from 'antd';
import { CalendarOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ProfilePage = () => {
    // Sample data for user profile
    const userProfile = {
        name: 'John Doe',
        avatar: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
        bio: 'A passionate web developer!',
        skills: ['Programming', 'Gaming', 'Photography'],
        availability: 'Available for bookings',
    };

    return (
        <Layout className='bg-bg_color'>
            <Content className="p-4 sm:p-8">
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Card className="text-center">
                            <Avatar size={150} src={userProfile.avatar} />
                            <Title level={3} className="mt-4 font-poppins sm:text-center md:text-start">{userProfile.name}</Title>
                            <Paragraph className='sm:text-center md:text-start'>{userProfile.bio}</Paragraph>
                            <Divider />
                            <Title level={4} className='text-start font-poppins'>Skills</Title>
                            {userProfile.skills.map((skill, index) => (
                                <Tag key={index} className='mr-1 mt-1'>{skill}</Tag>
                            ))}
                            <Divider />
                            <Paragraph>{userProfile.availability}</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={12}>
                        <Card>
                            <Title className='font-poppins' level={3}>Upcoming Bookings</Title>
                            {/* Add components to display upcoming bookings */}
                            <div className="text-center">
                                <CalendarOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                        <Card className="mt-4">
                            <Title className='font-poppins' level={3}>Messages</Title>
                            {/* Add components to display messages */}
                            <div className="text-center">
                                <MessageOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                        <Card className="mt-4">
                            <Title className='font-poppins' level={3}>Settings</Title>
                            {/* Add components for profile settings */}
                            <div className="text-center">
                                <SettingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ProfilePage;
