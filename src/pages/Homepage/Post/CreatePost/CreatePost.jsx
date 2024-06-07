import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Upload, message, Progress } from 'antd';
import { SendOutlined, UploadOutlined, PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [content, setContent] = useState('');
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate upload progress
            if (uploading && uploadProgress < 100) {
                setUploadProgress(prevProgress => prevProgress + 10);
            } else if (uploadProgress === 100) {
                setUploading(false);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [uploading, uploadProgress]);

    const handleContentChange = (value) => {
        setContent(value);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const postData = {
                title: values.title,
                content,
                imageUrl,
                user: authUser?._id
            };

            // Simulate API request delay
            axios.defaults.withCredentials = true;
            const response = await axios.post('https://www.api.onlyhumanity.co.uk/api/forumPosts/createPost', postData);
            if (response.data.success) {
                message.success('Post created successfully!');
                form.resetFields();
                setImageUrl(null);
                setContent('');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async ({ file }) => {
        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            });

            setImageUrl(response.data.data.url);
            message.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card title="Create a post">
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input your post title!' }]}>
                    <Input placeholder="Enter post title" />
                </Form.Item>
                <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input your post content!' }]}>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange}
                        placeholder="Write something..."
                    />
                </Form.Item>
                <Form.Item name="image" label="Upload Image">
                    <Upload
                        maxCount={1}
                        listType="picture"
                        customRequest={handleUpload}
                        showUploadList={{ showPreviewIcon: false }}
                    >
                        <Button icon={<UploadOutlined />} loading={uploading} disabled={uploading}>
                            {uploading ? `Uploading (${uploadProgress}%)` : 'Click to Upload'}
                        </Button>
                    </Upload>
                    {uploading && (
                        <Progress percent={uploadProgress} size="small" />
                    )}
                    {imageUrl && (
                        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />} loading={loading} disabled={loading || uploading}>
                        {loading ? 'Posting' : 'Post'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreatePost;
