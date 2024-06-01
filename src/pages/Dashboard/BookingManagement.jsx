import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Dropdown, Menu, Modal, Form, Input, Select } from 'antd';
import { CalendarOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Option } = Select;

const BookingManagement = () => {
    const { authUser } = useSelector(store => store.user);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filter, setFilter] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const userId = authUser?._id;
                const response = await axios.get(`http://localhost:4000/api/v1/booking/getBookings/${userId}`);
                const { buyerBookings, sellerBookings } = response.data;
                const allBookings = [...buyerBookings, ...sellerBookings];
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [authUser]);

    const handleFilterChange = (key) => {
        setFilter(key);
        if (key === 'all') {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(booking => booking.status === key));
        }
    };

    const handleEdit = (booking) => {
        setCurrentBooking(booking);
        setModalVisible(true);
    };

    const handleSave = async (values) => {
        try {
            axios.defaults.withCredentials = true;
            await axios.put(`http://localhost:4000/api/v1/booking/updateBooking/${currentBooking._id}`, values);
            const updatedBookings = bookings.map(booking =>
                booking._id === currentBooking._id ? { ...booking, ...values } : booking
            );
            setBookings(updatedBookings);
            setFilteredBookings(updatedBookings.filter(booking => filter === 'all' || booking.status === filter));
            setModalVisible(false);
            setCurrentBooking(null);
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleAccept = async (booking) => {
        try {
            const payload = {
                status: 'completed',
                amount: booking.amount,
                author: booking.product.author
            };
            await axios.put(`http://localhost:4000/api/v1/booking/updateBookingConfirm/${booking._id}`, payload);
            const updatedBookings = bookings.map(b =>
                b._id === booking._id ? { ...b, status: 'completed' } : b
            );
            setBookings(updatedBookings);
            setFilteredBookings(updatedBookings.filter(booking => filter === 'all' || booking.status === filter));
        } catch (error) {
            console.error('Error accepting booking:', error);
        }
    };

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (text, record) => <a href={record.product.link}>{record.product.name}</a>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tag color={status === 'completed' ? 'success' : status === 'pending' ? 'processing' : status === 'confirm' ? 'success' : status === 'accepted' ? 'cyan' : 'error'}>
                    {status === 'confirm' ? 'Waiting for Accept' : status}
                </Tag>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text, record) => (record.buyer === authUser?._id ? 'Bought' : 'Sold'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    {record.seller === authUser?._id && record.status !== 'completed' && record.status !== 'confirm' && (
                        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                            Edit
                        </Button>
                    )}
                    {record.buyer === authUser?._id && record.status === 'confirm' && (
                        <Button type="primary" onClick={() => handleAccept(record)}>
                            Accept
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const filterMenu = (
        <Menu onClick={({ key }) => handleFilterChange(key)}>
            <Menu.Item key="all">All</Menu.Item>
            <Menu.Item key="completed">Completed</Menu.Item>
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="cancelled">Cancelled</Menu.Item>
        </Menu>
    );

    return (
        <Card title="Booking Management">
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <Dropdown overlay={filterMenu}>
                    <Button>
                        Filter by Status <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <Table
                columns={columns}
                dataSource={filteredBookings}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="Edit Booking"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form
                    layout="vertical"
                    initialValues={currentBooking}
                    onFinish={handleSave}
                >
                    <Form.Item
                        label="Product Name"
                        name={['product', 'name']}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select the status!' }]}
                    >
                        <Select>
                            {currentBooking && currentBooking.seller === authUser?._id && (
                                <Option value="confirm">Confirm</Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default BookingManagement;
