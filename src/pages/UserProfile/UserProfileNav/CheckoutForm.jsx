import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Form, Button, notification, Input } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
  .ant-form-item-label {
    padding-bottom: 8px;
  }
  .StripeElement {
    padding: 11px 14px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-bottom: 24px;
  }
`;

const CheckoutForm = ({ project }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [paymentAddress, setPaymentAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // Create a payment intent on the server
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/payment/payment_intent`, {
                amount: project.price * 100, // Amount in cents
                email: values.email, // Use form input value for email
                paymentAddress: values.paymentAddress, // Use form input value for payment address
                productID: project._id
            });

            const { clientSecret } = response.data;

            // Confirm the payment on the client
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: values.name
                    }
                }
            });

            if (error) {
                console.error('[error]', error);
                notification.error({
                    message: 'Payment Error',
                    description: error.message,
                });
            } else if (paymentIntent.status === 'succeeded') {
                notification.success({
                    message: 'Purchase Successful',
                    description: `You have successfully purchased the project: ${project.name}`,
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
            notification.error({
                message: 'Payment Error',
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledForm layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Payment Address" name="paymentAddress" rules={[{ required: true, message: 'Please enter your payment address' }]}>
                <Input onChange={(e) => setPaymentAddress(e.target.value)} />
            </Form.Item>
            <Form.Item label="Credit Card">
                <CardElement />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!stripe || loading} loading={loading}>
                    Pay ${project.price}
                </Button>
            </Form.Item>
        </StyledForm>
    );
};

export default CheckoutForm;
