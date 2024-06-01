import { useState, useEffect } from 'react';
import { Button, Modal, DatePicker, TimePicker, Space, message, Alert, Input } from 'antd';
import { ScheduleFilled } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

    useEffect(() => {
        validateSchedule(date, startTime, endTime);
    }, [date, startTime, endTime]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (isScheduleAvailable(date, startTime, endTime)) {
            try {
                const appointmentData = {
                    buyer: authUser?._id, // Replace with actual buyer ID
                    seller: userId, // Replace with actual seller ID
                    amount: 100, // Replace with actual amount
                    status: 'pending',
                    date: date.format(),
                    startTime: startTime.format(),
                    endTime: endTime.format(),
                    message: messageText
                };

                const response = await axios.post('http://localhost:4000/api/v1/appointment/createAppointment', appointmentData);
                message.success('Your booking has been confirmed.');
                setIsModalVisible(false);
            } catch (error) {
                message.error('An error occurred while booking the appointment.');
            }
        } else {
            message.error('The selected time slot is already booked.');
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

    const isScheduleAvailable = (date, startTime, endTime) => {
        if (!date || !startTime || !endTime) return false; // Consider as not available if any field is not filled

        // Adjust selected times to the same date
        const selectedStart = moment(date).set({
            hour: startTime.hour(),
            minute: startTime.minute()
        });
        const selectedEnd = moment(date).set({
            hour: endTime.hour(),
            minute: endTime.minute()
        });

        // You can remove the existingSchedules check and rely solely on the backend validation
        return true;
    };

    const validateSchedule = (date, startTime, endTime) => {
        if (!date || !startTime || !endTime) {
            setError(null);
            setIsButtonDisabled(true);
            return;
        }

        const isValid = isScheduleAvailable(date, startTime, endTime);
        setError(isValid ? null : 'The selected time slot is already booked.');
        setIsButtonDisabled(!isValid);
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
                okText="Confirm Booking"
                cancelText="Cancel"
                okButtonProps={{ disabled: isButtonDisabled }}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
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
                    {error && <Alert message={error} type="error" showIcon />}
                </Space>
            </Modal>
        </>
    );
};

export default BookAppointment;
