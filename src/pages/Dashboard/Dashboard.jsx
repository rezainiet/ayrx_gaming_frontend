import React from 'react';
import { Layout, Card, Row, Col, Statistic, Table, Tag } from 'antd';
import {
    DollarCircleOutlined,
    CalendarOutlined,
    NotificationOutlined,
    CheckCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

const Dashboard = () => {
    // Sample data for payment history table
    const paymentHistoryData = [
        {
            key: '1',
            date: '2024-05-15',
            amount: '$50',
            type: 'Donation',
            status: 'Completed',
        },
        {
            key: '2',
            date: '2024-05-14',
            amount: '$30',
            type: 'Tip',
            status: 'Completed',
        },
        // Add more sample data as needed
    ];

    // Columns configuration for payment history table
    const paymentHistoryColumns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Completed' ? 'success' : 'processing'}>{status}</Tag>
            ),
        },
    ];

    return (
        <Layout>
            <Content className="p-1 md:p-3 lg:p-6 xl:p-8 bg-bg_color">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Card title="Earnings Overview">
                            <Statistic
                                title="Total Earnings"
                                value="$500"
                                prefix={<DollarCircleOutlined />}
                            />
                            {/* Add more Statistic components for additional metrics */}
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <Card title="Commission Rates">
                            <Statistic
                                title="Current Rate"
                                value="10%"
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={12}>
                        <Card title="Payment History" className='mb-5'>
                            <div style={{ overflowX: 'auto' }}>
                                <Table
                                    dataSource={paymentHistoryData}
                                    columns={paymentHistoryColumns}
                                    pagination={false}
                                />
                            </div>
                        </Card>
                    </Col>

                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card title="Booking Management">
                            {/* Add components for managing bookings */}
                            <div className="text-center">
                                <CalendarOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <Card title="Messaging System">
                            {/* Add components for messaging system */}
                            <div className="text-center">
                                <NotificationOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <Card title="Review Management">
                            {/* Add components for review management */}
                            <div className="text-center">
                                <CheckCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <Card title="Tips Management">
                            {/* Add components for managing tips */}
                            <div className="text-center">
                                <DollarCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Dashboard;