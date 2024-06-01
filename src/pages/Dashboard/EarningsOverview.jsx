import React from 'react';
import { Card, Statistic, Row, Col, Progress } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';

const EarningsOverview = () => {
    // Sample data for demonstration
    const totalEarnings = 500;
    const totalSpent = 200;
    const mainBalance = totalEarnings - totalSpent;

    return (
        <Card title="Balance" style={{ borderRadius: 10 }}>
            <Row>
                <Col span={24}>
                    <Statistic
                        title="Main Balance"
                        value={`$${mainBalance}`}
                        prefix={<DollarCircleOutlined style={{ fontSize: 24 }} />}
                        valueStyle={{ fontSize: 20 }}
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default EarningsOverview;
