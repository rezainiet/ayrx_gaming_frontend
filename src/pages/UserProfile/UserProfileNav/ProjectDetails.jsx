import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Tag, Divider, Spin, Row, Col, Descriptions, notification } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import CheckoutForm from './CheckoutForm';

const { Title } = Typography;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER_KEY);

const StyledContainer = styled.div`
    padding: 40px;
    background: #f0f2f5;
`;

const StyledCard = styled.div`
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/projects/${id}`);
            const data = response.data;
            setProject(data.project);
        } catch (error) {
            console.error('Error fetching project details:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch project details. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (!project) {
        return <div>No project details found.</div>;
    }

    return (
        <StyledContainer>
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <StyledCard>
                        <div className='my-5'>
                            {project.coverPhoto && (
                                <>
                                    <Divider />
                                    <img src={project.coverPhoto} alt="Cover" style={{ width: '100%', borderRadius: '8px' }} />
                                </>
                            )}
                        </div>
                        <Title className='font-poppins' level={2}>{project.name}</Title>
                        {/* <Divider /> */}
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Price">${project.price}</Descriptions.Item>
                            <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
                            <Descriptions.Item label="Tags">
                                {project.tags.map(tag => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </Descriptions.Item>
                        </Descriptions>

                    </StyledCard>
                </Col>
                <Col xs={24} lg={12}>
                    <StyledCard>
                        <Title level={3}>Checkout</Title>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm project={project} />
                        </Elements>
                    </StyledCard>
                </Col>
            </Row>
        </StyledContainer>
    );
};

export default ProjectDetails;
