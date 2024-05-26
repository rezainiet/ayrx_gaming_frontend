import { useEffect, useState } from 'react';
import { Layout, Row, Col, Avatar, Typography, Divider, Button, Card, Tag, Space } from 'antd';
import { UserAddOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserNextSteps from './UserNextSteps/UserNextSteps';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRecentPosts from './UserRecentPosts/UserRecentPosts';

const { Content } = Layout;
const { Title, Text } = Typography;

const UserProfile = () => {
    const { userId } = useParams();
    const { authUser } = useSelector(store => store.user);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:4000/api/v1/user/getUserDataById/${userId}`);
                setUser(res.data.user); // Assuming the user data is in res.data.user
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    console.log(user);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    // console.log(user)
    return (
        <Layout>
            <Content className="xs:p-0 sm:p-0 md:p-2 lg:p-5 xl:p-8 bg-bg_color">
                <Row justify="center">
                    <Col xs={24} sm={20} lg={16}>
                        <Card>

                            {/* Profile header */}
                            <Row gutter={[16, 16]} align="middle" className="p-4 bg-white shadow rounded-md">
                                <Col>
                                    <Avatar size={120} src={authUser?.profilePhoto} />
                                </Col>
                                <Col>
                                    <Title level={2} className='font-poppins'>{user?.fullName || "userName"}</Title>
                                    <Text type="secondary" className='font-poppins'>{user?.userTitle || "New User"}</Text>
                                </Col>
                                <Col className="ml-auto">
                                    <Space>
                                        <Button icon={<UserAddOutlined />} type="primary" className="font-poppins">Add Friend</Button>
                                        <Button icon={<MessageOutlined />} className="font-poppins">Message</Button>
                                        {/* <Button icon={<StopOutlined />} danger className="font-poppins">Block</Button>
                                        <Button icon={<CloseCircleOutlined />} className="font-poppins">Cancel Request</Button> */}
                                        {/* <Button icon={<EditOutlined />} onClick={showModal} className="font-poppins">Edit Profile</Button> */}
                                    </Space>
                                </Col>
                            </Row>


                            <Divider />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12}>
                                    <Card title='About Me' className='mb-5'>
                                        <Text className='font-poppins'>{user?.aboutUser || "Hey, I'm New User."}</Text>
                                    </Card>

                                    {/* Next Steps */}
                                    <UserNextSteps />


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
                            {<UserProfileNav />}
                        </Card>
                        <Divider />

                        {/* recent posts */}
                        <Title level={3} className='font-poppins'>Recent Posts</Title>
                        <UserRecentPosts />
                    </Col>



                </Row>
            </Content>

        </Layout>
    );
};

export default UserProfile;