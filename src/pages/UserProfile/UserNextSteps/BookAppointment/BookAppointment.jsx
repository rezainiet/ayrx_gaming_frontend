import { useState, useEffect } from 'react';
import { Button, Modal, DatePicker, TimePicker, Space, message, Alert, Input } from 'antd';
import { ScheduleFilled } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

const existingSchedules = [
    {
        start: moment('2024-05-27 04:00'),
        end: moment('2024-05-27 06:00')
    },
    {
        start: moment('2024-06-02 14:00'),
        end: moment('2024-06-02 15:00')
    }
];

const BookAppointment = () => {
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

    const handleOk = () => {
        if (isScheduleAvailable(date, startTime, endTime)) {
            console.log("Date:", date);
            console.log("Start Time:", startTime);
            console.log("End Time:", endTime);
            console.log("Message:", messageText);
            message.success('Your booking has been confirmed.');
            setIsModalVisible(false);
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
        const selectedStart = moment(date).set({
            hour: startTime.hour(),
            minute: startTime.minute()
        });
        const selectedEnd = moment(date).set({
            hour: endTime.hour(),
            minute: endTime.minute()
        });
        return !existingSchedules.some(schedule =>
            (selectedStart.isBetween(schedule.start, schedule.end, null, '[)') ||
                selectedEnd.isBetween(schedule.start, schedule.end, null, '(]')) ||
            (selectedStart.isSameOrBefore(schedule.start) && selectedEnd.isSameOrAfter(schedule.end))
        );
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
}

export default BookAppointment;
