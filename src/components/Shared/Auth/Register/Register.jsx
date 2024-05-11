import React, { useState } from 'react';
import { Layout, Form, Input, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import RegisterImage from './../../../../assets/images/auth_bg.png'; // Import your image
import auth from '../../../../firebase.config';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const onFinish = (values) => {
        const userData = { fullName, email, password, gender };
        console.log('User Data:', userData);
        // Your registration logic here
    };

    return (
        <Layout className='bg-green-100 bg-opacity-25'>
            <Content className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                    <img src={RegisterImage} alt="Register" className="mb-6 w-40 h-40 object-cover rounded-full" />
                    <h1 className="text-3xl font-bold mb-4 text-center">Create an Account</h1>
                    <p className="text-gray-600 mb-6 text-center">Sign up to get started</p>
                    <div className="text-center mb-4">Sign up with email</div>
                    <Form
                        name="register_form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className="w-full"
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input size='large' onChange={(e) => setFullName(e.target.value)} prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input size='large' onChange={(e) => setEmail(e.target.value)} prefix={<UserSwitchOutlined />} type="text" placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)} size='large' prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            rules={[{ required: true, message: 'Please select your gender!' }]}
                        >
                            <Radio.Group onChange={(e) => setGender(e.target.value)} size='large'>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' type="primary" htmlType="submit" className="w-full">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        Already have an account? <a href="/login">Log in</a>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Register;