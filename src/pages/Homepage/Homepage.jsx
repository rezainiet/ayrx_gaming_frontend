// src/pages/HomePage.js
import React from 'react';
import { Layout, Row, Col, Typography, Divider } from 'antd';
import CreatePost from './Post/CreatePost/CreatePost';
import Feed from './Feed/Feed';
import Sidebar from './Sidebar/Sidebar';
import Hint from './Static/Hint';

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
    const userRole = 'user'; // This should be dynamically set based on user authentication

    return (
        <Layout>
            <Content className="p-4 sm:p-8">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={18} lg={16}>
                        <Hint userRole={userRole} />
                        <Divider />
                        {userRole === 'admin' && <CreatePost />}
                        <Feed />
                    </Col>
                    <Col xs={24} sm={6} lg={8}>
                        <Sidebar />
                        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                            <Title level={4}>Announcements</Title>
                            <p>Stay updated with the latest news and updates from our community.</p>
                            <a href="#" className="text-blue-500">Read more</a>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                            <Title level={4}>Upcoming Events</Title>
                            <p>Join our upcoming events and webinars to connect and learn.</p>
                            <a href="#" className="text-blue-500">View Events</a>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;
