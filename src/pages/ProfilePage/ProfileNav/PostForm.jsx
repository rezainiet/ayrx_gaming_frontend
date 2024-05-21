import { Button, Card, Col, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const PostForm = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const postData = {
                title: values.title,
                postContent: values.postContent,
                privacy: values.privacy,
                imageUrl
            };

            const response = await axios.post('http://localhost:4000/api/v1/posts/createPost', postData);
            message.success('Post created successfully!');
            form.resetFields();
            setImageUrl(null);
            setLoading(false);
        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Failed to create post. Please try again.');
            setLoading(false);
        }
    };

    const handleUpload = async ({ file }) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false, // Set withCredentials to false
            });
            setImageUrl(response.data.data.url);
            message.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image. Please try again.');
        }
    };

    return (
        <Card title="Create a post">
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ privacy: 'public' }}
                layout="vertical"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={18}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                            <Input placeholder="Enter post title" />
                        </Form.Item>
                        <Form.Item name="postContent" label="What's on your mind?" rules={[{ required: true, message: 'Please input your text content!' }]}>
                            <Input.TextArea placeholder="Write something..." autoSize={{ minRows: 3, maxRows: 6 }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={6}>
                        <Form.Item name="privacy" label="Privacy">
                            <Select>
                                <Option value="public">Public</Option>
                                <Option value="friends">Friends</Option>
                                <Option value="onlyMe">Only Me</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={6}>
                        <Form.Item name="images" label="Upload Image">
                            <Upload
                                maxCount={1}
                                listType="picture"
                                customRequest={handleUpload}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            {imageUrl && (
                                <img src={imageUrl} alt="Uploaded" style={{ width: '100%', marginTop: '10px' }} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block icon={<PlusCircleOutlined />} loading={loading}>
                        Post
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default PostForm;
