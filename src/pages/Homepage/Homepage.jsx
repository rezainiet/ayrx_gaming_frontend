import React, { useState } from 'react';
import { Layout, Row, Col, Card, Avatar, Divider, Typography, Button, Input, Form, Upload, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    // State to track if the reply form is open
    const [replyFormOpen, setReplyFormOpen] = useState(false);

    // State to store the reply content
    const [replyContent, setReplyContent] = useState('');

    // Function to toggle the reply form
    const toggleReplyForm = () => {
        setReplyFormOpen(!replyFormOpen);
    };

    // Function to handle reply submission
    const handleReplySubmit = () => {
        // Your logic to submit the reply
        // You can send the replyContent to your backend or handle it locally
        // Reset the reply content and close the reply form
        setReplyContent('');
        setReplyFormOpen(false);
    };



    // Sample feed data
    const feedData = [
        {
            id: 1,
            user: {
                name: 'John Doe',
                avatar: 'https://via.placeholder.com/150',
            },
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dicta quidem sed quas laudantium accusantium doloremque vitae, tenetur reiciendis inventore necessitatibus quae voluptatem quam veritatis ab quisquam repellendus nulla rerum eius?',
            likes: 10,
            comments: [
                {
                    id: 1,
                    user: 'Alice',
                    comment: 'Great post!',
                    replies: [
                        { id: 1, user: 'Bob', comment: 'Thanks!' },
                        { id: 2, user: 'Charlie', comment: 'Nice!' },
                    ],
                },
            ],
            shares: 2,
        },
        {
            id: 2,
            user: {
                name: 'Alice Smith',
                avatar: 'https://via.placeholder.com/150',
            },
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            likes: 15,
            comments: [],
            shares: 3,
        },
        // Add more feed items as needed
    ];

    // Function to handle post submission
    const handlePostSubmit = (values) => {
        // console.log('Submitted:', values);
        // Add logic to submit post
    };

    // Function to handle comment click
    const handleCommentClick = (postId) => {
        setActiveCommentId(postId === activeCommentId ? null : postId);
    };

    // Function to handle image upload
    const handleImageUpload = (info) => {
        if (info.file.status === 'done') {
            // File is uploaded successfully
            setImageFile(info.file.originFileObj);
        } else if (info.file.status === 'removed') {
            // File is removed
            setImageFile(null);
        }
    };


    return (
        <Layout>
            <Content className="p-4 sm:p-8">
                <Row gutter={[16, 16]}>
                    {/* Main Content */}
                    <Col xs={24} sm={18}>
                        {/* Create Post Section */}
                        <Card className="mb-4 p-4 shadow-md rounded-lg" title='Create A Post!'>
                            <Form layout="vertical" onFinish={handlePostSubmit}>
                                <Form.Item name="content">
                                    <Input.TextArea rows={4} placeholder="What's on your mind?" />
                                </Form.Item>
                                <Form.Item name="image">
                                    <Upload
                                        name="image"
                                        accept=".jpg,.jpeg,.png,.gif"
                                        listType="picture"
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleImageUpload}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                    {imageFile && <Image src={URL.createObjectURL(imageFile)} alt="Uploaded" className="mt-2" />}
                                </Form.Item>
                                <Form.Item className="text-right -mt-14">
                                    <Button type="primary" icon={<SendOutlined />} htmlType="submit">
                                        Post
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                        {/* Feed */}
                        {feedData.map((item) => (
                            <Card key={item.id} className="mb-4" bordered={false}>
                                {/* User Info */}
                                <div className="flex items-center mb-2">
                                    <div className="flex-shrink-0">
                                        <Avatar size={64} src={item.user.avatar} />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold">{item.user.name}</h3>
                                        <p className="text-gray-500">{item.postDate}</p>
                                    </div>
                                </div>
                                {/* Post Data (Image and Text) */}
                                <div>
                                    <p className="text-gray-800">{item.content}</p>
                                    {item.image && <img src={item.image} alt="Post" className="mt-2 rounded-lg" />}
                                </div>
                                <Divider className="my-4" />
                                {/* Comment Section */}
                                <div className="flex flex-col sm:flex-row justify-between items-center ">
                                    <div className="flex items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                                        <Button icon={<LikeOutlined />} type="text">
                                            Like ({item.likes})
                                        </Button>
                                        <Button icon={<CommentOutlined />} type="text" onClick={() => handleCommentClick(item.id)}>
                                            Comment ({item.comments.length})
                                        </Button>
                                        <Button icon={<ShareAltOutlined />} type="text">
                                            Share ({item.shares})
                                        </Button>
                                    </div>
                                </div>
                                <Divider className="my-4" />
                                <div>
                                    {/* Comments */}
                                    {item.id === activeCommentId && (
                                        <div className="bg-gray-100 p-4 rounded-lg">
                                            {item.comments.map((comment) => (
                                                <div key={comment.id} className="mb-4">
                                                    {/* Comment content */}
                                                    <div className="flex items-start">
                                                        {/* User avatar */}
                                                        <img src={comment.avatar || "https://via.placeholder.com/150"} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                                                        {/* Comment details */}
                                                        <div className="flex flex-col">
                                                            {/* User name and comment */}
                                                            <div>
                                                                <p className="font-semibold">{comment.user}:</p>
                                                                <p>{comment.comment}</p>
                                                            </div>
                                                            {/* Reply button */}
                                                            <button className="text-blue-500 hover:text-blue-700 mt-1" onClick={toggleReplyForm}>Reply</button>
                                                            {/* Reply form */}
                                                            {replyFormOpen && (
                                                                <div className="mt-2">
                                                                    <textarea
                                                                        value={replyContent}
                                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                                        placeholder="Write your reply..."
                                                                        className="border border-gray-300 rounded-lg p-2 w-full"
                                                                    />
                                                                    <button onClick={handleReplySubmit} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">Post Reply</button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </Card>
                        ))}
                    </Col>
                    {/* Right Sidebar */}
                    <Col xs={24} sm={6}>
                        {/* Right sidebar content */}
                        <Card className="mb-4 shadow-md rounded-lg">
                            <div className="p-4">
                                {/* Sidebar title */}
                                <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
                                {/* Individual suggestion items */}
                                <div className="flex items-center mb-4">
                                    {/* Profile picture */}
                                    <img src="https://via.placeholder.com/150" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                                    {/* User name */}
                                    <div>
                                        <h4 className="text-sm font-semibold">John Doe</h4>
                                        <p className="text-xs text-gray-500">Friend</p>
                                    </div>
                                </div>
                                {/* Repeat the above structure for each suggestion */}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default HomePage;
