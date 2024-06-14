import React, { useState, useEffect } from 'react';
import { List, Spin, Alert, Card, Row, Col, Avatar, DatePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyAppointments = () => {
    const { authUser } = useSelector(store => store.user);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!authUser?._id) return;

            try {
                setLoading(true);
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/appointment/getUserAppointments?userId=${authUser._id}`);

                if (response.status !== 200) {
                    throw new Error('Failed to fetch appointments');
                }

                setAppointments(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [authUser?._id]);

    const handleDateChange = (date) => {
        setSelectedDate(date ? date.format('YYYY-MM-DD') : null);
    };

    const filteredAppointments = selectedDate
        ? appointments.filter(appointment => moment(appointment.date).format('YYYY-MM-DD') === selectedDate)
        : appointments;

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="p-4"><Alert message="Error" description={error} type="error" showIcon /></div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">My Appointments</h2>
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-lg mb-2">Choose a Date to view filtered appointments</h1>
                <DatePicker onChange={handleDateChange} className="w-full sm:w-1/2" />
            </div>
            {filteredAppointments.length > 0 ? (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={filteredAppointments}
                    renderItem={appointment => (
                        <List.Item>
                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                <Row gutter={[16, 16]}>
                                    <Col xs={6} sm={4} md={3}>
                                        <Avatar size={64} src={appointment.buyer.profilePhoto} alt={appointment.seller.fullName} />
                                    </Col>
                                    <Col xs={18} sm={20} md={21}>
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <h3 className="text-xl font-semibold"><span className='font-bold'>Seller:</span> {appointment.seller.fullName}</h3>
                                                <p className="text-gray-500">{moment(appointment.date).format('MMMM Do YYYY')}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">{moment(appointment.startTime).format('hh:mm A')} to {moment(appointment.endTime).format('hh:mm A')}</p>
                                                <p className="text-gray-600 mt-2"><span className='font-semibold'>Message:</span> {appointment.message}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <p className="text-gray-500">No appointments found.</p>
            )}
        </div>
    );
};

export default MyAppointments;
