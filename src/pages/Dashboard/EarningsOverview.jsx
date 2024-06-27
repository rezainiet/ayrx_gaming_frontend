import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Spin, Alert, Typography, Button, Modal, Form, Input, Select, message } from 'antd';
import { DollarCircleOutlined, BankOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const EarningsOverview = () => {
    const [mainBalance, setMainBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getUserDetails`);
                setMainBalance(response.data.user.balance);
            } catch (error) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleWithdraw = async (values) => {
        console.log(values)
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/withdrawal/createWithdraw`, values, {
            });
            message.success('Withdrawal request submitted successfully');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data);
            } else {
                message.error('An error occurred. Please try again.');
            }
        }
    };

    const handleMethodChange = (value) => {
        setSelectedMethod(value);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }

    return (
        <Card
            title={<Title level={3} className="mb-0 font-poppins">Earnings Overview</Title>}
            style={{ borderRadius: 10 }}
            className="shadow-lg"
        >
            <Row gutter={16}>
                <Col span={24} className="mb-4">
                    <Statistic
                        title="Main Balance"
                        value={`${mainBalance !== null ? `${mainBalance}` : '$0'} USD.`}
                        prefix={<DollarCircleOutlined style={{ fontSize: 24, color: '#3f8600' }} />}
                        valueStyle={{ fontSize: 36, color: '#3f8600' }}
                    />
                </Col>
                <Col span={24}>
                    <Button type="primary" onClick={showModal} icon={<BankOutlined />}>
                        {`Withdraw Balance`}
                    </Button>
                </Col>
            </Row>
            <Modal
                title="Withdraw Funds"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleWithdraw}>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: 'Please enter the amount to withdraw' }]}
                    >
                        <Input prefix="$" type="number" />
                    </Form.Item>
                    <Form.Item
                        name="method"
                        label="Withdrawal Method"
                        rules={[{ required: true, message: 'Please select a withdrawal method' }]}
                    >
                        <Select placeholder="Select a method" onChange={handleMethodChange}>
                            <Option value="PayPal">PayPal</Option>
                            <Option value="Bank">Bank</Option>
                        </Select>
                    </Form.Item>
                    {selectedMethod === 'PayPal' && (
                        <Form.Item
                            name="paypalEmail"
                            label="PayPal Email"
                            rules={[{ required: true, message: 'Please enter your PayPal email' }, { type: 'email', message: 'Please enter a valid email' }]}
                        >
                            <Input />
                        </Form.Item>
                    )}
                    {selectedMethod === 'Bank' && (
                        <Form.Item
                            name="bankDetails"
                            label="Bank Details"
                            rules={[{ required: true, message: 'Please enter your bank details' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Enter your bank account number, bank name, and other relevant details" />
                        </Form.Item>
                    )}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default EarningsOverview;
