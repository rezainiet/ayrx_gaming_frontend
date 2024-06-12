import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Tag, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Expertise = ({ userId }) => {
    const { authUser } = useSelector(store => store.user);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects from the server when the component mounts
        setLoading(true);
        fetchProjects();
        setLoading(false)
    }, []);

    const fetchProjects = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getProjects/${authUser?._id}`);
            const data = response.data;
            setProjects(data.projects); // Update state with fetched projects
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const columns = [
        {
            title: 'Project Name',
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
        // {
        //     title: 'Actions',
        //     key: 'actions',
        //     render: (text, record) => (
        //         <Button type="primary">
        //             <Link to={`/session-based-project/${record._id}`}>View Details</Link>
        //         </Button>
        //     ),
        // },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} className='font-poppins'>Projects</Title>

            <div className='overflow-x-auto'>
                {
                    loading ? <Skeleton /> : <Table
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

export default Expertise;