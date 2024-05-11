import React, { useState } from 'react';
import { Layout, Row, Col, Avatar, Typography, Divider, Button, Card, List, Tag, Menu } from 'antd';
import { UserOutlined, EditOutlined, HeartOutlined, SketchCircleFilled, ScheduleFilled } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import Marquee from "react-fast-marquee";
import ProfileNav from './ProfileNav/ProfileNav';

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    const interests = ['Programming', 'Reading', 'Hiking', 'Cooking', 'Traveling'];

    const posts = [
        {
            id: 1,
            content: 'Just finished a great hiking trip in the mountains!',
            likes: 56,
            comments: 12,
        },
        {
            id: 2,
            content: 'Trying out a new recipe tonight!',
            likes: 34,
            comments: 8,
        },
        {
            id: 3,
            content: 'Excited for my upcoming trip to Europe!',
            likes: 78,
            comments: 23,
        },
    ];

    return (
        <Layout>
            <Content className="xs:p-0 sm:p-0 md:p-2 lg:p-5 xl:p-8 bg-bg_color">
                <Row justify="center">
                    <Col xs={24} sm={20} lg={16}>
                        <Card>
                            <Row gutter={[16, 16]} align="middle">
                                <Col>
                                    <Avatar size={120} icon={<UserOutlined />} />
                                </Col>
                                <Col>
                                    <Title level={2} className='font-poppins'>John Doe</Title>
                                    <Text type="secondary" className='font-poppins'>Software Developer</Text>
                                </Col>
                                <Col className="ml-auto">
                                    <Button icon={<EditOutlined />}>Edit Profile</Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Card title='About Me' className='mb-5'>
                                        <Text className='font-poppins'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sapien eros.</Text>
                                    </Card>
                                    <Card title="Next Step...">
                                        <div style={{ marginBottom: '16px' }}>
                                            <Title level={5} className='font-poppins'>Ready to schedule a session?</Title>
                                            <Text className='font-poppins'>Book your appointment now to get started on your journey towards success.</Text>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <Button size='medium' type="primary" icon={<ScheduleFilled />}>
                                                Booking
                                            </Button>
                                            <Button size='medium' type="primary" icon={<SketchCircleFilled />}>Send Tips</Button>
                                        </div>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Card>
                                        <Title level={4} className='font-poppins'>Interests</Title>
                                        <div>
                                            {interests.map(interest => (
                                                <Tag key={interest} color="geekblue">{interest}</Tag>
                                            ))}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Divider />
                            {<ProfileNav />}

                        </Card>
                        <Divider />
                        <Title level={3} className='font-poppins'>Recent Posts</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={posts}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="#">{item.content}</a>}
                                        description={
                                            <div>
                                                <HeartOutlined style={{ marginRight: '8px' }} />
                                                {item.likes} Likes
                                                <Divider type="vertical" />
                                                <Text className='font-poppins'>{item.comments} Comments</Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Profile;
