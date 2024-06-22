import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, Divider, message } from 'antd';
import { SketchCircleFilled } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './SendTips.css'; // Import your custom CSS for styling
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER_KEY); // Replace with your actual Stripe publishable key

const { Option } = Select;

const SendTips = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tipAmount, setTipAmount] = useState(null);
    const [tipNotes, setTipNotes] = useState('');
    const [country, setCountry] = useState('');
    const [form] = Form.useForm();
    const stripe = useStripe();
    const elements = useElements();
    const { authUser } = useSelector(store => store.user);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const values = await form.validateFields();
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: values.fullName,
                    email: values.email,
                    address: {
                        line1: values.address,
                        city: values.city,
                        country: values.country,
                        postal_code: values.postalCode,
                    },
                },
            });

            if (error) {
                console.log('[error]', error);
                message.error(error.message);
                return;
            }

            console.log('[PaymentMethod]', paymentMethod);

            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/payment/send-tip`, {
                paymentMethodId: paymentMethod.id,
                amount: tipAmount * 100, // Stripe amount is in cents
                notes: tipNotes,
                email: values.email,
                paymentAddress: values.address,
                authUserID: authUser?._id
            });

            if (response.data.success) {
                message.success('Your tips have been sent.');
                setIsModalVisible(false);
                form.resetFields();
            } else {
                message.error(`Failed to send tips. ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error sending tip:', error);
            message.error('Failed to send tips. Please try again later.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const onAmountChange = (value) => {
        setTipAmount(value);
    };

    const onNotesChange = (e) => {
        setTipNotes(e.target.value);
    };

    const onCountryChange = (value) => {
        setCountry(value);
    };

    return (
        <>
            <Button size='medium' type="primary" icon={<SketchCircleFilled />} onClick={showModal}>
                Send Tips
            </Button>
            <Modal
                title="Send Tips"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Send"
                cancelText="Cancel"
                okButtonProps={{ className: "send-tips-button" }} // Apply custom class to the "Send" button
            >
                <Form form={form} layout="vertical">
                    <Divider>User Information</Divider>
                    <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                        <Input placeholder="Enter your email" type="email" />
                    </Form.Item>
                    <Divider>Billing Address</Divider>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                        <Input placeholder="Enter your address" />
                    </Form.Item>
                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
                        <Input placeholder="Enter your city" />
                    </Form.Item>
                    <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select your country' }]}>
                        <Select placeholder="Select your country" onChange={onCountryChange}>
                            <Option value="US">USA</Option>
                            <Option value="GB">UK</Option>
                            <Option value="CA">Canada</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Postal Code" name="postalCode" rules={[{ required: true, message: 'Please enter your postal code' }]}>
                        <Input placeholder="Enter your postal code" />
                    </Form.Item>
                    <Divider>Tips Details</Divider>
                    <Form.Item label="Amount" required>
                        <InputNumber
                            className="tip-amount-input"
                            placeholder="Enter tip amount"
                            onChange={onAmountChange}
                            value={tipAmount}
                            min={1}
                        />
                    </Form.Item>
                    <Form.Item label="Notes">
                        <Input.TextArea
                            className="tip-notes-input"
                            placeholder="Enter your notes"
                            rows={4}
                            onChange={onNotesChange}
                            value={tipNotes}
                        />
                    </Form.Item>
                    <Form.Item label="Card Details" required>
                        <CardElement className="stripe-card-element" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

const WrappedSendTips = () => (
    <Elements stripe={stripePromise}>
        <SendTips />
    </Elements>
);

export default WrappedSendTips;
