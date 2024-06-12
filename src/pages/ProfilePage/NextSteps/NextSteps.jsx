import { useState } from 'react';
import { Button, Card, Typography, Modal, DatePicker, TimePicker, Space, message } from 'antd';
import { ScheduleFilled, SketchCircleFilled } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const NextSteps = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dates, setDates] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <Card title="Recent Transactions">
            <div style={{ marginBottom: '16px' }}>
                <Title level={5} className='font-poppins'>Transactions</Title>
                <Text className='font-poppins'>Secure your appointment now and start your journey towards success.</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button size='medium' type="primary" icon={<ScheduleFilled />} onClick={showModal}>
                    Book Now
                </Button>
                <Button size='medium' type="primary" icon={<SketchCircleFilled />}>Get Tips</Button>
            </div>

        </Card>
    );
}

export default NextSteps;
