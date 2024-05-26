import React from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const CreateGameGroup = ({ gameId }) => {
    const { authUser } = useSelector(store => store.user);
    const [form] = Form.useForm();

    const handleCreateGroup = async (values) => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/groups/create', {
                title: values.title,
                description: values.description,
                coverPhoto: values.coverPhoto,
                author: authUser?._id, // Author ID from the form input
                gameId: gameId
            });
            console.log('New Group:', response.data);
            form.resetFields();
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="mt-8">
            <Title level={4} className="font-poppins">Create a New Group</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateGroup}
                className="font-poppins"
            >
                <Form.Item
                    name="title"
                    label="Group Name"
                    rules={[{ required: true, message: 'Please enter a group name' }]}
                >
                    <Input placeholder="Enter group name" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <Input.TextArea placeholder="Enter description" rows={4} />
                </Form.Item>
                <Form.Item
                    name="coverPhoto"
                    label="Cover Photo URL"
                >
                    <Input placeholder="Enter cover photo URL" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create Group</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateGameGroup;