import React, { useEffect, useState } from 'react';
import { List, Avatar, message, Typography, Button, Tag, Card, Space } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { BiHandicap } from 'react-icons/bi';

const { Title, Text } = Typography;

const BookedAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { authUser } = useSelector(store => store.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/appointment/getPurchasedAppointments/${authUser?._id}`);
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
        const response = await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/appointment/cancelAppointment/${id}/${authUser?._id}`);
        console.log(response)
    }

    const handleClickDelete = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/v1/appointment/deleteAppointment/${id}/${authUser?._id}`);
            console.log(response)
            if (response.status === 200) {
                // Provide feedback to the user (e.g., show a success message, update UI)
                message.success('Appointment deleted successfully.');
                console.log(response.data);
            } else {
                message.error('Failed to delete the appointment.');
            }
        } catch (error) {
            console.error('Error while deleting appointment:', error);
            message.error('An error occurred while deleting the appointment.');
        }
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
                                {appointment.status === 'cancelled' && <Button type="primary" danger onClick={() => handleClickDelete(appointment?._id)}>Delete</Button>}
                            </div>
                        </List.Item>
                    </Card>
                )}
            />
        </div>
    );
};

export default BookedAppointments;
