import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Tag, Table, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';
import EarningsOverview from './EarningsOverview';
import CommissionRates from './HourlyRates';
import BookingManagement from './BookingManagement';
import MessagingSystem from './ProjectBasedJob';
import ReviewManagement from './ReviewManagement';
import TipsManagement from './TipsManagement';

const { Content } = Layout;

const paymentHistoryColumns = [
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => moment(date).fromNow(), // Human-readable format
    },
    {
        title: 'Amount',
        dataIndex: ['payment', 'amount'],
        key: 'amount',
        render: (amount) => `$${amount}`,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        // render: (type) => (type === 'debit' ? 'Debit' : 'Credit'), // Display "debit" or "credit"
        render: (type) => (
            <Tag color={type === 'debit' ? 'error' : 'success'}>
                {type}
            </Tag>
        ), // Display "debit" or "credit"
    },
    {
        title: 'Transaction Type',
        dataIndex: 'transactionType',
        key: 'transactionType',
    },
    {
        title: 'Status',
        dataIndex: ['payment', 'status'],
        key: 'status',
        render: (status) => (
            <Tag color={status === 'completed' ? 'success' : status === 'pending' ? 'processing' : 'error'}>
                {status}
            </Tag>
        ),
    },
];

const Dashboard = () => {
    const [paymentHistoryData, setPaymentHistoryData] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get('http://localhost:4000/api/v1/payment/transactions', { withCredentials: true });
                setPaymentHistoryData(response.data);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: 'Failed to fetch payment history',
                });
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Layout>
            <Content className="p-1 md:p-3 lg:p-6 xl:p-8 bg-bg_color">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <EarningsOverview />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                        <CommissionRates />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} className='overflow-x-auto'>
                        <Table
                            dataSource={paymentHistoryData}
                            columns={paymentHistoryColumns}
                            rowKey="_id"
                            title={() => 'Payment History'}
                        />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <BookingManagement />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <MessagingSystem />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <ReviewManagement />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                        <TipsManagement />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Dashboard;
