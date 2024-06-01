// HomePage.js
import React from 'react';
import { Layout, Row, Col } from 'antd';
import CreatePost from './Post/CreatePost/CreatePost';
import Feed from './Feed/Feed';
import Sidebar from './Sidebar/Sidebar';

const { Content } = Layout;

const HomePage = () => {
    return (
        <Layout>
            <Content className="p-4 sm:p-8">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={18}>
                        <CreatePost />
                        <Feed />
                    </Col>
                    <Col xs={24} sm={6}>
                        <Sidebar />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;
