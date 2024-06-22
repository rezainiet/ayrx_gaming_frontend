import React, { useEffect, useState } from 'react';
import { List, Avatar, message, Typography, Button, Tag, Card, Space } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { BiHandicap } from 'react-icons/bi';

const { Title, Text } = Typography;

const ReceivedAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { authUser } = useSelector(store => store.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/appointment/getReceivedAppointments/${authUser?._id}`);
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching purchased appointments:', error);
                message.error('An error occurred while fetching your appointments.');
                setLoading(false);
            }
        };

        if (authUser?._id) {
            fetchAppointments();
        }
    }, [authUser?._id]);


    const handleClickCancel = async (id) => {
        axios.defaults.withCredentials = true;
        const response = await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/appointment/cancelAppointmentFromSeller/${id}/${authUser?._id}`);
        console.log(response)

    }
    return (
        <div className='my-3 text-start'>
            <List
                itemLayout="vertical"
                dataSource={appointments}
                loading={loading}
                renderItem={appointment => (
                    <Card className='mb-3'>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar size={64} src={appointment.seller.profilePhoto} />}
                                title={<Title level={4}>Appointment with {appointment.seller.fullName}</Title>}
                                description={
                                    <Space direction="vertical">
                                        <Text strong>Date: {moment(appointment.date).format('MMM D, YYYY (ddd)')}</Text>
                                        <Text strong>Time: {moment(appointment.startTime).format('h A')} - {moment(appointment.endTime).format('h A')}</Text>
                                        <Text>Notes: {appointment.message}</Text>
                                    </Space>
                                }
                            />
                            <div className='flex items-center justify-center gap-2'>
                                <Tag color={appointment.status === 'pending' ? 'orange' : 'green'}>{appointment.status}</Tag>
                                {appointment.status === 'pending' && <Button type="primary" danger onClick={() => handleClickCancel(appointment?._id)}>Cancel</Button>}
                            </div>
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};

export default ReceivedAppointments;
