import React, { useState } from 'react';
import { Card, Menu } from 'antd';
import { BookOutlined, InboxOutlined } from '@ant-design/icons';
import ReceivedAppointments from './ReceivedAppointments';
import BookedAppointments from './BookedAppointments';

const AppointmentManagement = () => {
    const [currentMenu, setCurrentMenu] = useState('booked');

    const handleMenuClick = (e) => {
        setCurrentMenu(e.key);
    };

    return (
        <Card title="Appointments">
            <Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} mode="inline" className='flex overflow-x-auto rounded-md'>
                <Menu.Item key="booked" icon={<BookOutlined />}>
                    Booked
                </Menu.Item>
                <Menu.Item key="received" icon={<InboxOutlined />}>
                    Received
                </Menu.Item>
            </Menu>
            <div className="text-center">
                {currentMenu === 'booked' && <BookedAppointments />}
                {currentMenu === 'received' && <ReceivedAppointments />}
            </div>
        </Card>
    );
};




export default AppointmentManagement;
