import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import RegisterImage from './../../../../assets/images/auth_bg.png'; // Import your image
import auth from '../../../../firebase.config';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleGoogleSignUp = () => {
        // Implement Google sign-up logic here
    };

    const handleFacebookSignUp = () => {
        // Implement Facebook sign-up logic here
    };

    const onFinish = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('Registered User:', user?.email);
            if (user?.email) {
                navigate('/')
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Layout className='bg-green-100 bg-opacity-25'>
            <Content className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                    <img src={RegisterImage} alt="Register" className="mb-6 w-40 h-40 object-cover rounded-full" />
                    <h1 className="text-3xl font-bold mb-4 text-center">Create an Account</h1>
                    <p className="text-gray-600 mb-6 text-center">Sign up to get started</p>
                    <Button type="primary" className="w-full mb-4" icon={<GoogleOutlined />} size="large" onClick={handleGoogleSignUp}>
                        Continue with Google
                    </Button>
                    <Button type="primary" className="w-full mb-4" icon={<FacebookOutlined />} size="large" onClick={handleFacebookSignUp}>
                        Continue with Facebook
                    </Button>
                    <div className="text-center mb-4">Or sign up with email</div>
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
                            <Input size='large' onChange={(e) => setName(e.target.value)} prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input size='large' onChange={(e) => setEmail(e.target.value)} prefix={<MailOutlined />} type="email" placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onChange={(e) => setPassword(e.target.value)} size='large' prefix={<LockOutlined />} placeholder="Password" />
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
