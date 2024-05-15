import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { LockOutlined, UserSwitchOutlined } from '@ant-design/icons';
import LoginImage from './../../../../assets/images/auth_bg-2.jpg'; // Import your image
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../../../redux/userSlice';

const { Content } = Layout;

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('Submitted')
        try {
            const user = { userName, password };
            const res = await axios.post(`http://localhost:4000/api/v1/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.userName) {
                dispatch(setAuthUser(res.data));
                navigate('/');
                toast.success("User logged in successful.");
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    return (
        <Layout className='bg-green-100 bg-opacity-25'>
            <Content className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                    <img src={LoginImage} alt="Login" className="mb-6 w-40 h-40 object-cover rounded-full" />
                    <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
                    <p className="text-gray-600 mb-6 text-center">Log in to your account to continue</p>
                    <div className="text-center mb-4">Log in with email</div>
                    <Form
                        name="login_form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        className="w-full"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input onChange={(e) => setUserName(e.target.value)} size='large' prefix={< UserSwitchOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)} size='large' prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' type="primary" htmlType="submit" className="w-full">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        Don't have an account? <a href="/register">Sign up</a>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Login;