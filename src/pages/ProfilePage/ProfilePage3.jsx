import { useEffect, useState } from 'react';
import { Layout, Row, Col, Avatar, Typography, Divider, Button, Card, Tag, Space } from 'antd';
import { EditOutlined, UserAddOutlined, MessageOutlined } from '@ant-design/icons';
import ProfileNav from './ProfileNav/ProfileNav';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditProfile from './Modals/EditProfile/EditProfile';
import RecentPosts from './RecentPosts/RecentPosts';
import NextSteps from './NextSteps/NextSteps';

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
                                        <Button icon={<EditOutlined />} onClick={showModal} className="font-poppins">Edit Profile</Button>
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
                                    <NextSteps />


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
                        <RecentPosts />
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
