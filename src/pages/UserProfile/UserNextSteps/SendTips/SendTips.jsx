import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select, Divider, message } from 'antd';
import { SketchCircleFilled } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './SendTips.css'; // Import your custom CSS for styling

const stripePromise = loadStripe('pk_test_51PKmGjDYUg5iGXsDLr9aKfeZx6aGJ7br9MS4t3TiBTmribrZfhe3eRR4dv1p0pbOV64OJ2c5ydU7xW69mwF7kXNr00u4kFdhdP'); // Replace with your actual Stripe publishable key

const { Option } = Select;

const SendTips = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tipAmount, setTipAmount] = useState(null);
    const [tipNotes, setTipNotes] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            message.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            message.success('Your tips have been sent.');
            console.log("Tip Amount:", tipAmount);
            console.log("Tip Notes:", tipNotes);
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onAmountChange = (value) => {
        setTipAmount(value);
    };

    const onNotesChange = (e) => {
        setTipNotes(e.target.value);
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
                <Form layout="vertical">
                    <Divider>User Information</Divider>
                    <Form.Item label="Full Name" required>
                        <Input placeholder="Enter your full name" />
                    </Form.Item>
                    <Form.Item label="Email" required>
                        <Input placeholder="Enter your email" type="email" />
                    </Form.Item>
                    <Divider>Billing Address</Divider>
                    <Form.Item label="Address" required>
                        <Input placeholder="Enter your address" />
                    </Form.Item>
                    <Form.Item label="City" required>
                        <Input placeholder="Enter your city" />
                    </Form.Item>
                    <Form.Item label="Country" required>
                        <Select placeholder="Select your country">
                            <Option value="USA">USA</Option>
                            <Option value="UK">UK</Option>
                            <Option value="Canada">Canada</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Postal Code" required>
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
