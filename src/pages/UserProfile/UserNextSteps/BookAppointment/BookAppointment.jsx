import React, { useState, useEffect } from 'react';
import { Button, Modal, DatePicker, TimePicker, Space, message, Alert, Input, List } from 'antd';
import { ScheduleFilled } from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const BookAppointment = () => {
    const { userId } = useParams();
    const { authUser } = useSelector(store => store.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [error, setError] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [getVisitedUser, setVisitedUser] = useState({});
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchVisitedUserProfile = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getUserDataById/${userId}`);
            setVisitedUser(response.data.user);
        };
        fetchVisitedUserProfile();
    }, [userId]);

    useEffect(() => {
        if (date) {
            fetchBookedAppointments(date);
        }
    }, [date]);

    useEffect(() => {
        validateSchedule(date, startTime, endTime);
        calculateAmount(startTime, endTime, getVisitedUser.hourlyRate);
    }, [date, startTime, endTime, getVisitedUser]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const isAvailable = await isScheduleAvailable(date, startTime, endTime);
        if (isAvailable) {
            try {
                const paymentIntentResponse = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/payment/create-payment-intent`, {
                    amount: Math.round(amount * 100) // convert to cents
                });

                setClientSecret(paymentIntentResponse.data.clientSecret);
                message.success('Payment intent created. Please confirm payment.');
            } catch (error) {
                message.error('An error occurred while creating the payment intent.');
                console.error('Error creating payment intent:', error);
            }
        } else {
            message.error('The selected time slot is already booked.');
        }
    };

    const handlePayment = async () => {
        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            }
        });

        if (error) {
            message.error('Payment failed.');
            console.error('Payment error:', error);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                const appointmentData = {
                    buyer: authUser?._id,
                    seller: userId,
                    amount: amount,
                    status: 'pending',
                    date: date.format('YYYY-MM-DD'),
                    startTime: startTime.format('HH:mm'),
                    endTime: endTime.format('HH:mm'),
                    message: messageText,
                    clientSecret
                };

                const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/appointment/createAppointment`, appointmentData);
                message.success('Your booking has been confirmed.');
                setIsModalVisible(false);
            } catch (error) {
                message.error('An error occurred while booking the appointment.');
                console.error('Error booking appointment:', error);
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onDateChange = (date) => {
        setDate(date);
    };

    const onStartTimeChange = (time) => {
        setStartTime(time);
    };

    const onEndTimeChange = (time) => {
        setEndTime(time);
    };

    const onMessageChange = (e) => {
        setMessageText(e.target.value);
    };

    const isScheduleAvailable = async (date, startTime, endTime) => {
        if (!date || !startTime || !endTime) return false;

        const selectedStart = moment(date).set({
            hour: startTime.hour(),
            minute: startTime.minute()
        });
        const selectedEnd = moment(date).set({
            hour: endTime.hour(),
            minute: endTime.minute()
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/appointment/checkAvailability`, {
                date: selectedStart.format('YYYY-MM-DD'),
                startTime: selectedStart.format('HH:mm'),
                endTime: selectedEnd.format('HH:mm'),
                seller: userId
            });
            return response.data.isAvailable;
        } catch (error) {
            console.error('Error checking schedule availability:', error);
            return false;
        }
    };

    const validateSchedule = async (date, startTime, endTime) => {
        if (!date || !startTime || !endTime) {
            setError(null);
            setIsButtonDisabled(true);
            return;
        }

        const isValid = await isScheduleAvailable(date, startTime, endTime);
        setError(isValid ? null : 'The selected time slot is already booked.');
        setIsButtonDisabled(!isValid);
    };

    const fetchBookedAppointments = async (date) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/appointment/getBookedAppointments`, {
                date: date.format('YYYY-MM-DD'),
                seller: userId
            });
            setBookedAppointments(response.data.appointments);
        } catch (error) {
            console.error('Error fetching booked appointments:', error);
        }
    };

    const calculateAmount = (startTime, endTime, hourlyRate) => {
        if (!startTime || !endTime || !hourlyRate) {
            setAmount(0);
            return;
        }

        const duration = moment.duration(endTime.diff(startTime));
        const hours = duration.asHours();
        const calculatedAmount = hours * hourlyRate;
        setAmount(calculatedAmount);
    };

    return (
        <>
            <Button size='medium' type="primary" icon={<ScheduleFilled />} onClick={showModal}>
                Book Now
            </Button>
            <Modal
                title="Book Your Appointment"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Create Payment Intent"
                cancelText="Cancel"
                okButtonProps={{ disabled: isButtonDisabled || clientSecret }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {bookedAppointments.length > 0 && (
                        <List
                            header={<div>Booked Appointments for This Day</div>}
                            bordered
                            className='text-blue-500'
                            dataSource={bookedAppointments}
                            renderItem={item => (
                                <List.Item>
                                    {`Start: ${moment(item.startTime).format('HH:mm')} - End: ${moment(item.endTime).format('HH:mm')}`}
                                </List.Item>
                            )}
                        />
                    )}
                    <DatePicker style={{ width: '100%' }} onChange={onDateChange} />
                    <TimePicker style={{ width: '100%' }} onChange={onStartTimeChange} placeholder="Start Time" format="HH:mm" />
                    <TimePicker style={{ width: '100%' }} onChange={onEndTimeChange} placeholder="End Time" format="HH:mm" />
                    <Input.TextArea
                        style={{ width: '100%' }}
                        placeholder="Additional message"
                        rows={4}
                        onChange={onMessageChange}
                        value={messageText}
                    />
                    <CardElement />
                    <div>Amount: {amount ? `$${amount.toFixed(2)}` : 'N/A'}</div>
                    {error && <Alert message={error} type="error" className='' showIcon />}
                </Space>
                <Button type="primary" onClick={handlePayment} className='mt-2' disabled={!clientSecret}>
                    Confirm Booking
                </Button>
            </Modal>
        </>
    );
};

export default BookAppointment;
