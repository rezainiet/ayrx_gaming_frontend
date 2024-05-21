import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

const EditProfile = ({ isVisible, handleOk, handleCancel, user }) => {
    const [form] = Form.useForm();

    // Set form values when the component mounts or user changes
    React.useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);

    return (
        <Modal
            title="Edit Profile"
            open={isVisible}
            onOk={async () => {
                try {
                    const values = await form.validateFields();
                    handleOk(values);
                } catch (error) {
                    console.error('Validation Failed:', error);
                }
            }}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your full name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="userTitle"
                    label="Title"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="aboutUser"
                    label="About Me"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="interests"
                    label="Interests"
                >
                    <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
                        {user?.interests?.map(interest => (
                            <Option key={interest}>{interest}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfile;
