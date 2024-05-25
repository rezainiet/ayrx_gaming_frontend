import { Avatar, Button, Card, Divider, Form, Image, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { HeartOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import axios from 'axios';

const { Text } = Typography;

const RecentPost = ({ item, authUser }) => {
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [replyFormOpen, setReplyFormOpen] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [mainComment, setMainComment] = useState("");
    const [comments, setComments] = useState(item?.comments || []);

    const handleCommentClick = (postId) => {
        setActiveCommentId(postId === activeCommentId ? null : postId);
    };

    const toggleReplyForm = () => {
        setReplyFormOpen(!replyFormOpen);
    };

    const handleReplySubmit = () => {
        // Handle reply submission
        setReplyContent("");
        setReplyFormOpen(false);
    };

    const handleMainCommentSubmit = async (postId) => {
        try {
            // Assuming you have an API endpoint to post comments
            const response = await axios.put(`http://localhost:4000/api/v1/posts/${postId}/createComment`, {
                userId: authUser?._id,
                text: mainComment
            });
            console.log("Main comment posted:", response.data);
            // Append the new comment to the existing comments state
            setComments([...comments, response.data.comments.slice(-1)[0]]);
            // Clear the input field after submission
            setMainComment("");
        } catch (error) {
            console.error("Error posting main comment:", error);
        }
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd MMM yyyy \'at\' h:mm a');
    };

    return (
        <div>
            <Card className="mb-4" bordered={false}>
                {/* User Info */}
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0">
                        <Link to={item?.author?._id}>
                            <Avatar size={64} src={item?.author?.profilePhoto} />
                        </Link>
                    </div>
                    <div className="ml-3">
                        <Link to={item?.author?._id}><h3 className="text-lg font-semibold">{item?.author?.fullName}</h3></Link>
                        <p className="text-gray-500">{formatDate(item?.createdAt)}</p>
                    </div>
                </div>
                {/* Post Data (Image and Text) */}
                <div>
                    <p className="text-gray-800">{item?.postContent}</p>
                    {item?.imageUrl && <img src={item?.imageUrl} alt="Post" className="mt-2 rounded-lg" style={{ width: '100%' }} />}
                </div>
                <Divider className="my-4" />

                {/* Posts Engage Details */}
                <div className="flex flex-col sm:flex-row justify-between items-center ">
                    <div className="flex items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                        <Button icon={<HeartOutlined />} type="text">
                            Like ({item?.likes})
                        </Button>
                        <Button icon={<CommentOutlined />} type="text" onClick={() => handleCommentClick(item._id)}>
                            Comment ({comments.length})
                        </Button>
                        <Button icon={<ShareAltOutlined />} type="text">
                            Share
                        </Button>
                    </div>
                </div>
                <Divider className="my-4" />

                <div>
                    {/* Comments */}
                    {item?._id === activeCommentId && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            {comments.map((comment) => (
                                <div key={comment._id} className="mb-4 border-b pb-4">
                                    <div className="flex items-start">
                                        <Avatar src={comment?.profilePhoto || "https://via.placeholder.com/150"} className="mr-3" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <Text strong>{comment?.fullName}</Text>
                                                <Text type="secondary">{formatDate(comment?.createdAt)}</Text>
                                            </div>
                                            <Text>{comment?.comment}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Main Comment */}
                            <Form onFinish={() => handleMainCommentSubmit(item?._id)}>
                                <Form.Item>
                                    <Input.TextArea
                                        value={mainComment}
                                        onChange={(e) => setMainComment(e.target.value)}
                                        placeholder="Write your comment..."
                                        rows={4}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Post Comment
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default RecentPost;
