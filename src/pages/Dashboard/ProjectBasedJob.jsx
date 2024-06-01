import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useImgBBUploader from '../../hooks/useImgBBUploader';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProjectBasedJob = () => {
    const { authUser } = useSelector(store => store.user);
    const [form] = Form.useForm();
    const [projects, setProjects] = useState([]);
    const { loading, imageUrl, uploadImage } = useImgBBUploader(); // Use the custom hook

    const onFinish = async (values) => {
        const { name, price, tags, description } = values;

        try {
            if (!imageUrl) {
                throw new Error('Please upload a cover photo');
            }

            const projectData = {
                name,
                price,
                tags: tags.split(',').map(tag => tag.trim()), // Split and trim tags
                description,
                coverPhoto: imageUrl
            };

            axios.defaults.withCredentials = true;
            const res = await axios.post(`http://localhost:4000/api/v1/user/${authUser?._id}/addUserProject`, projectData);
            const result = res.data;

            setProjects([...projects, projectData]);
            form.resetFields();
            message.success('Project added successfully!');
        } catch (error) {
            console.error('Error adding project:', error);
            message.error(error.message || 'Failed to add project. Please try again later.');
        }
    };

    const onRemoveProject = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    return (
        <Card title="Add Project">
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Project Name" rules={[{ required: true, message: 'Please enter project name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="coverPhoto" label="Cover Photo" rules={[{ required: true, message: 'Please upload a cover photo' }]}>
                    <Upload
                        beforeUpload={(file) => {
                            uploadImage(file);
                            return false; // Prevent default upload behavior
                        }}
                        showUploadList={false} // Hide uploaded files list
                    >
                        <Button icon={<UploadOutlined />} loading={loading}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                    <Input type="number" min={0} />
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                    <Input placeholder="Enter tags separated by commas" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add Project
                    </Button>
                </Form.Item>
            </Form>
            {loading ? (
                <div className="loading-container">
                    <Spin size="large" />
                </div>
            ) : (
                <div>
                    {projects.map((project, index) => (
                        <Card key={index} title={project.name} extra={<Button onClick={() => onRemoveProject(index)} type="link">Remove</Button>}>
                            <p>Price: {project.price}</p>
                            <p>Tags: {project.tags.join(', ')}</p>
                            <p>Description: {project.description}</p>
                            <img src={project.coverPhoto} alt="Cover" style={{ maxWidth: '100%' }} />
                        </Card>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default ProjectBasedJob;
