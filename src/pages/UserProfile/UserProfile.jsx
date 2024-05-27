import { Layout, Row, Col, Avatar, Typography, Divider, Button, Card, Tag, Space } from 'antd';
import { UserAddOutlined, UserDeleteOutlined, MessageOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserNextSteps from './UserNextSteps/UserNextSteps';
import UserProfileNav from './UserProfileNav/UserProfileNav';
import UserRecentPosts from './UserRecentPosts/UserRecentPosts';
import useFetchUserData from '../../hooks/useFetchUserData';
import useFriendRequest from '../../hooks/useFriendRequest';
import { useState, useEffect } from 'react';

const { Content } = Layout;
const { Title, Text } = Typography;

const UserProfile = () => {
    const { userId } = useParams();
    const { authUser } = useSelector(store => store.user);
    const { user, loading } = useFetchUserData(userId);
    const [isSentRequest, setIsSentRequest] = useState(undefined);
    const [isReceivedRequest, setIsReceivedRequest] = useState(undefined);

    const { sendFriendRequest, cancelFriendRequest, acceptFriendRequest } = useFriendRequest(isSentRequest, isReceivedRequest);

    useEffect(() => {
        if (!loading && user) {
            setIsSentRequest(user.isSentRequest);
            setIsReceivedRequest(user.isReceivedRequest);
        }
    }, [loading, user]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    console.log("Is Friend:", user.isFriend, "Is Sent Request:", isSentRequest, "Is Received Request:", isReceivedRequest);

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
                                        {user.isFriend ? (
                                            <Button
                                                icon={<CheckCircleOutlined />}
                                                type="primary"
                                                className="font-poppins"
                                            >
                                                Friends
                                            </Button>
                                        ) : (
                                            <>
                                                {isReceivedRequest ? (
                                                    <Button
                                                        icon={<CheckCircleOutlined />}
                                                        type="primary"
                                                        className="font-poppins"
                                                        onClick={() => acceptFriendRequest(userId)}
                                                    >
                                                        Confirm Request
                                                    </Button>
                                                ) : isSentRequest ? (
                                                    <Button
                                                        icon={<UserDeleteOutlined />}
                                                        type="primary"
                                                        danger
                                                        className="font-poppins"
                                                        onClick={() => cancelFriendRequest(userId)}
                                                    >
                                                        Cancel Request
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        icon={<UserAddOutlined />}
                                                        type="primary"
                                                        className="font-poppins"
                                                        onClick={() => sendFriendRequest(userId)}
                                                    >
                                                        Add Friend
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                        {user.isFriend && (
                                            <>
                                                <Button icon={<MessageOutlined />} className="font-poppins">Message</Button>
                                                <Button icon={<StopOutlined />} className="font-poppins">Block</Button>
                                            </>
                                        )}
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
                            <UserProfileNav />
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
