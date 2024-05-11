import { Button, Card, Col, Form, Input, Row, Select, Upload } from 'antd';
import { UploadOutlined, PlusSquareFilled, PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';

const { Option } = Select;

const PostForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <Card title="Add Your Skill">
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ privacy: 'public' }}
                layout="vertical"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} lg={18}>
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
                            <Upload maxCount={1} listType="picture">
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block icon={<PlusCircleOutlined />}>
                        Add Skill
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default PostForm;
