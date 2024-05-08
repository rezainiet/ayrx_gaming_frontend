import React from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Divider, Button } from 'antd';
import { MessageOutlined, DollarCircleOutlined, CalendarOutlined, SettingOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage2 = () => {
    // Sample user profile data
    const userProfile = {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis ex a metus bibendum varius. In hac habitasse platea dictumst.',
        reviews: [
            { id: 1, user: 'Alice', rating: 4, comment: 'Great experience!' },
            { id: 2, user: 'Bob', rating: 5, comment: 'Highly recommended!' },
            { id: 3, user: 'Charlie', rating: 3, comment: 'Could be better.' },
        ],
        donations: 100,
        bookings: 5,
        showPersonalDetails: true,
        pinnedPosts: [
            { id: 1, title: 'Post 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
            { id: 2, title: 'Post 2', content: 'Nullam quis ex a metus bibendum varius.' },
            { id: 3, title: 'Post 3', content: 'In hac habitasse platea dictumst.' },
        ],
    };


    // Function to handle messaging
    const handleMessaging = () => {
        // Add logic for messaging feature
    };

    // Function to handle donations
    const handleDonation = () => {
        // Add logic for donation feature
    };

    // Function to handle bookings
    const handleBooking = () => {
        // Add logic for booking feature
    };

    // Function to handle profile settings
    const handleSettings = () => {
        // Add logic for settings feature
    };

    return (
        <Layout>
            <Content className="p-4 sm:p-8">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Card>
                            <Avatar size={150} src={userProfile.avatar} />
                            <Title level={3} className="mt-4">{userProfile.name}</Title>
                            <Text>{userProfile.bio}</Text>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <Card>
                            <Title level={4}>Reviews</Title>
                            {/* Render user reviews here */}
                        </Card>
                        <Card className="mt-4">
                            <Title level={4}>Donations</Title>
                            <Button type="primary" icon={<DollarCircleOutlined />} onClick={handleDonation}>Donate</Button>
                            <Text>Total Donations: {userProfile.donations}</Text>
                        </Card>
                        <Card className="mt-4">
                            <Title level={4}>Bookings</Title>
                            <Button type="primary" icon={<CalendarOutlined />} onClick={handleBooking}>Book Now</Button>
                            <Text>Total Bookings: {userProfile.bookings}</Text>
                        </Card>
                        <Card className="mt-4">
                            <Title level={4}>Messaging</Title>
                            <Button type="primary" icon={<MessageOutlined />} onClick={handleMessaging}>Message</Button>
                        </Card>
                        <Card className="mt-4">
                            <Title level={4}>Profile Settings</Title>
                            <Button type="primary" icon={<SettingOutlined />} onClick={handleSettings}>Settings</Button>
                            <Divider />
                            {userProfile.showPersonalDetails && (
                                <div>
                                    {/* Render personal details */}
                                </div>
                            )}
                        </Card>
                        <Card className="mt-4">
                            <Title level={4}>Pinned Posts</Title>
                            {/* Render user's pinned posts */}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ProfilePage2;