import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Tag, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const { Title } = Typography;

const Projects = ({ userId }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch projects from the server when the component mounts
        setLoading(true);
        fetchProjects();
        setLoading(false);
    }, []);

    const fetchProjects = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getProjects/${userId}`);
            const data = response.data;
            setProjects(data.projects); // Update state with fetched projects
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const columns = [
        {
            title: 'Service Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => `$${price}`,
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button type="primary">
                    <Link to={`/session-based-project/${record._id}`}>View Details</Link>
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} className='font-poppins'>Services</Title>
            <div className='overflow-x-auto'>
                {
                    loading ? <Skeleton /> :
                        <Table
                            dataSource={projects}
                            columns={columns}
                            pagination={false}
                            rowKey="_id"
                        />
                }
            </div>
        </div>
    );
};

export default Projects;
