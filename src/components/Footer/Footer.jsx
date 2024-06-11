import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    GithubOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
    return (
        <Footer className="font-poppins bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 text-white py-8">
            <div className='rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 p-6 sm:mx-4 md:mx-8'>
                <div className="mx-auto max-w-screen-xl">
                    <Row gutter={[16, 32]}>
                        <Col xs={24} md={8}>
                            <Title level={4} className="text-white">About Us</Title>
                            <Text className="text-gray-100">
                                https://www.onlyhumanity.co.uk is a platform where people can join, promote their profiles, posts, and forms, and get donations for sharing their skills or expertise with others.
                            </Text>
                        </Col>
                        <Col xs={24} md={8}>
                            <Title level={4} className="text-white">Quick Links</Title>
                            <ul className="list-none space-y-2">
                                <li><a href="/" className="text-gray-100 hover:text-white">Home</a></li>
                                <li><a href="/about" className="text-gray-100 hover:text-white">About</a></li>
                                <li><a href="/contact" className="text-gray-100 hover:text-white">Contact</a></li>
                                <li><a href="/terms" className="text-gray-100 hover:text-white">Terms and Conditions</a></li>
                                <li><a href="/privacy" className="text-gray-100 hover:text-white">Privacy Policy</a></li>
                            </ul>
                        </Col>
                        <Col xs={24} md={8} className=''>
                            <Title level={4} className="text-white">Follow Us</Title>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" className="text-gray-100 hover:text-white"><FacebookOutlined /></a>
                                <a href="https://twitter.com" className="text-gray-100 hover:text-white"><TwitterOutlined /></a>
                                <a href="https://instagram.com" className="text-gray-100 hover:text-white"><InstagramOutlined /></a>
                                <a href="https://github.com" className="text-gray-100 hover:text-white"><GithubOutlined /></a>
                            </div>
                        </Col>
                    </Row>
                    <div className="border-t border-gray-600 mt-8 pt-4 text-center">
                        <Text className="text-gray-100">
                            © 2024 Only Humanity. All rights reserved.
                        </Text>
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default AppFooter;
