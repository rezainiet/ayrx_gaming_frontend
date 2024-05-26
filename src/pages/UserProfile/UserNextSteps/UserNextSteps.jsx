import { Card, Typography } from 'antd';
import React from 'react';
import SendTips from './SendTips/SendTips';
import BookAppointment from './BookAppointment/BookAppointment';

const { Title, Text } = Typography;

const UserNextSteps = () => {
    return (
        <Card title="Next Steps">
            <div style={{ marginBottom: '16px' }}>
                <Title level={5} className='font-poppins'>Ready to schedule a session?</Title>
                <Text className='font-poppins'>Secure your appointment now and start your journey towards success.</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <BookAppointment />
                <SendTips />
            </div>
        </Card>
    );
}

export default UserNextSteps;
