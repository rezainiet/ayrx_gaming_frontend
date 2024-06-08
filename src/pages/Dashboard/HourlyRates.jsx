import React, { useState, useEffect } from 'react';
import { Card, Statistic, Input, Button, Form, notification, Spin, Typography } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import axios from 'axios'; // Add axios for making API calls

const { Text } = Typography;
const HourlyRates = () => {
    const [hourlyRate, setHourlyRate] = useState(null); // initial hourly rate
    const [newRate, setNewRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(null);

    useEffect(() => {
        const fetchHourlyRate = async () => {
            setLoading(true);
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getUserDetails`); // Adjust the endpoint as necessary
                const fetchedRate = response.data;
                if (fetchedRate.user.hourlyRate) {
                    setHourlyRate(fetchedRate.user?.hourlyRate);
                    setNewRate(fetchedRate.user?.hourlyRate);
                }
                else {
                    setHourlyRate(0);
                    setNewRate(0);
                }
            } catch (error) {
                notification.error({
                    message: 'Error Fetching Rate',
                    description: 'There was an error fetching the hourly rate.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHourlyRate();
    }, []);

    const handleRateChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value < 5 || value > 100) {
            setInputError('The hourly rate must be between 5 and 100.');
        } else {
            setInputError(null);
        }
        setNewRate(value);
    };

    const updateRate = async () => {
        if (newRate < 5 || newRate > 100) {
            notification.error({
                message: 'Invalid Rate',
                description: 'The hourly rate must be between 5% and 100%.',
            });
            return;
        }

        setLoading(true);
        try {
            axios.defaults.withCredentials = true;
            await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/user/updateHourlyRate`, { hourlyRate: newRate }); // Adjust the endpoint as necessary
            setHourlyRate(newRate);
            notification.success({
                message: 'Rate Updated',
                description: `The hourly rate has been updated to ${newRate}$.`,
            });
        } catch (error) {
            notification.error({
                message: 'Error Updating Rate',
                description: 'There was an error updating the hourly rate.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Hourly Rate" style={{ maxWidth: 400, margin: 'auto' }}>
            {loading && hourlyRate === null ? (
                <Spin tip="Loading...">
                    <div style={{ height: '200px' }} />
                </Spin>
            ) : (
                <>
                    <Statistic
                        title="Current Rate"
                        value={(hourlyRate !== null) || (hourlyRate !== undefined) ? `${hourlyRate} USD.` : 'Loading...'}
                        prefix={<DollarCircleOutlined />}
                    />
                    {
                        hourlyRate === 0 && <Text type='danger'>Setup your hourly rate.</Text>
                    }
                    <Form layout="vertical" style={{ marginTop: '16px' }}>
                        <Form.Item
                            label="Set New Rate"
                            validateStatus={inputError ? 'error' : ''}
                            help={inputError}
                        >
                            <Input
                                type="number"
                                value={newRate}
                                onChange={handleRateChange}
                                addonAfter="$"
                                min={5}
                                max={100}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={updateRate}
                                disabled={loading || inputError !== null}
                                block
                            >
                                {loading ? <Spin /> : 'Set New Rate'}
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </Card>
    );
};

export default HourlyRates;
