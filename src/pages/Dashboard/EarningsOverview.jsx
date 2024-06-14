import React, { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Spin, Alert, Typography } from 'antd';
import { DollarCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const { Title, Text } = Typography;

const EarningsOverview = () => {
    const [mainBalance, setMainBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:4000/api/v1/user/getUserDetails');
                setMainBalance(response.data.user.balance);
            } catch (error) {
                setError('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

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
            title={<Title level={3} className="mb-0">Earnings Overview</Title>}
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
                {/* <Col span={12}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title="Earnings This Month"
                            value="$12,345"
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col> */}
                {/* <Col span={12}>
                    <Card bordered={false} className="shadow-sm">
                        <Statistic
                            title="Expenses This Month"
                            value="$1,234"
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col> */}
            </Row>
        </Card>
    );
};

export default EarningsOverview;
