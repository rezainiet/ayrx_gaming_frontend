import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Avatar, Typography, Divider, Button, Card, List, Tag } from 'antd';
import { EditOutlined, HeartOutlined, ScheduleFilled, SketchCircleFilled } from '@ant-design/icons';
import ProfileNav from './ProfileNav/ProfileNav';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditProfile from './Modals/EditProfile/EditProfile';
import RecentPosts from './RecentPosts/RecentPosts';

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    const { authUser } = useSelector(store => store.user);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get('http://localhost:4000/api/v1/user/getUserDetails');
                setUser(res.data.user); // Assuming the user data is in res.data.user
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (updatedUser) => {
        try {
            const res = await axios.put('http://localhost:4000/api/v1/user/updateUserDetails', updatedUser);
            setUser(res.data.user); // Assuming the updated user data is in res.data.user
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const posts = [
        {
            id: 1,
            content: 'Just finished a great hiking trip in the mountains!',
            likes: 56,
            comments: 12,
        },
        {
            id: 2,
            content: 'Trying out a new recipe tonight!',
            likes: 34,
            comments: 8,
        },
        {
            id: 3,
            content: 'Excited for my upcoming trip to Europe!',
            likes: 78,
            comments: 23,
        },
    ];

    return (
        <Layout>
            <Content className="xs:p-0 sm:p-0 md:p-2 lg:p-5 xl:p-8 bg-bg_color">
                <Row justify="center">
                    <Col xs={24} sm={20} lg={16}>
                        <Card>
                            <Row gutter={[16, 16]} align="middle">
                                <Col>
                                    <Avatar size={120} src={authUser?.profilePhoto} />
                                </Col>
                                <Col>
                                    <Title level={2} className='font-poppins'>{authUser?.fullName || "userName"}</Title>
                                    <Text type="secondary" className='font-poppins'>{user?.userTitle}</Text>
                                </Col>
                                <Col className="ml-auto">
                                    <Button icon={<EditOutlined />} onClick={showModal}>Edit Profile</Button>
                                </Col>
                            </Row>
                            <Divider />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Card title='About Me' className='mb-5'>
                                        <Text className='font-poppins'>{user?.aboutUser}</Text>
                                    </Card>
                                    <Card title="Next Step...">
                                        <div style={{ marginBottom: '16px' }}>
                                            <Title level={5} className='font-poppins'>Ready to schedule a session?</Title>
                                            <Text className='font-poppins'>Book your appointment now to get started on your journey towards success.</Text>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                            <Button size='medium' type="primary" icon={<ScheduleFilled />}>
                                                Booking
                                            </Button>
                                            <Button size='medium' type="primary" icon={<SketchCircleFilled />}>Send Tips</Button>
                                        </div>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Card>
                                        <Title level={4} className='font-poppins'>Interests</Title>
                                        <div>
                                            {user?.interests?.map(interest => (
                                                <Tag key={interest} color="geekblue">{interest}</Tag>
                                            ))}
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Divider />
                            {<ProfileNav />}
                        </Card>
                        <Divider />

                        {/* recent posts */}
                        <Title level={3} className='font-poppins'>Recent Posts</Title>
                        <RecentPosts
                            posts={posts}
                        />
                    </Col>



                </Row>
            </Content>
            <EditProfile
                isVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                user={user}
            />
        </Layout>
    );
};

export default Profile;
