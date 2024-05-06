import React from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import LoginImage from './../../../../assets/images/auth_bg-2.jpg'; // Import your image

const { Content } = Layout;

const Login = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    const handleGoogleSignIn = () => {
        // Implement Google sign-in logic here
    };

    const handleFacebookSignIn = () => {
        // Implement Facebook sign-in logic here
    };

    return (
        <Layout className='bg-green-100 bg-opacity-25'>
            <Content className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                    <img src={LoginImage} alt="Login" className="mb-6 w-40 h-40 object-cover rounded-full" />
                    <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
                    <p className="text-gray-600 mb-6 text-center">Log in to your account to continue</p>
                    <Button size='large' type="primary" className="w-full mb-4" icon={<GoogleOutlined />} onClick={handleGoogleSignIn}>
                        Continue with Google
                    </Button>
                    <Button size='large' type="primary" className="w-full mb-4" icon={<FacebookOutlined size={'large'} />} onClick={handleFacebookSignIn}>
                        Continue with Facebook
                    </Button>
                    <div className="text-center mb-4">Or log in with email</div>
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
                            <Input size='large' prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size='large' prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' type="primary" htmlType="submit" className="w-full">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="text-center">
                        Don't have an account? <a href="#">Sign up</a>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Login;
