import { Avatar, Button, Card, Divider, Form, Input, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { HeartOutlined, HeartFilled, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import axios from 'axios';

const { Text } = Typography;

const SinglePost = ({ item, authUser }) => {
    const [activeCommentId, setActiveCommentId] = useState(null);
    const [replyFormOpen, setReplyFormOpen] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [mainComment, setMainComment] = useState("");
    const [comments, setComments] = useState(item?.comments || []);
    const [likes, setLikes] = useState(item?.likes || []);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(likes.some(like => like._id === authUser?._id));
    }, [likes, authUser]);

    useEffect(() => {
        // Retrieve the like status from local storage
        const likedStatus = localStorage.getItem(`liked_${item._id}`);
        // console.log(likedStatus)
        if (likedStatus === 'true') {
            setIsLiked(likedStatus === "false");
        }
        setIsLiked(likedStatus === "true");
    }, [item._id]);

    const handleCommentClick = (postId) => {
        setActiveCommentId(postId === activeCommentId ? null : postId);
    };

    const toggleReplyForm = () => {
        setReplyFormOpen(!replyFormOpen);
    };

    const handleReplySubmit = async (commentId) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/posts/${item._id}/comments/${commentId}/reply`, {
                userId: authUser?._id,
                text: replyContent
            });
            // console.log("Reply posted:", response.data);
            const updatedComments = comments.map(comment =>
                comment._id === commentId ? { ...comment, replies: [...(comment.replies || []), response.data.reply] } : comment
            );
            setComments(updatedComments);
            setReplyContent("");
            setReplyFormOpen(false);
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const handleMainCommentSubmit = async (postId) => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/comment/createCommentInGameGroup`, {
                authorId: authUser?._id,
                content: mainComment,
                postId: postId
            });
            // console.log(response)

            const newComment = response.data;
            // console.log(newComment);
            newComment.author = {
                _id: authUser?._id,
                profilePhoto: authUser?.profilePhoto,
                fullName: authUser?.fullName
            };

            // console.log("Main comment posted:", response.data);
            setComments([...comments, { ...newComment, replies: [] }]);
            setMainComment("");
        } catch (error) {
            console.error("Error posting main comment:", error);
        }
    };

    const handleLike = async (postId) => {
        try {
            let newLikes;
            if (isLiked) {
                // Remove like if already liked
                newLikes = likes.filter(like => like._id !== authUser?._id);
            } else {
                // Add like if not liked
                newLikes = [...likes, { _id: authUser?._id }];
            }
            setLikes(newLikes);
            setIsLiked(!isLiked);

            // Update the like status in local storage
            localStorage.setItem(`liked_${postId}`, !isLiked);

            // Send the like request to the server
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/posts/${postId}/like`, {
                userId: authUser?._id
            });
            // console.log("Post liked:", response.data);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };



    const formatDate = (dateString) => {
        if (!dateString) return "Invalid date";
        try {
            return format(new Date(dateString), 'dd MMM yyyy \'at\' h:mm a');
        } catch (error) {
            console.error("Invalid date format:", dateString);
            return "Invalid date";
        }
    };

    return (
        <div>
            <Card className="mb-4" bordered={false}>
                {/* User Info */}
                <div className="flex items-center mb-2">
                    <div className="flex-shrink-0">
                        <Link to={`/profile/${item?.author?._id}`}>
                            <Avatar size={64} src={item?.author?.profilePhoto} />
                        </Link>
                    </div>
                    <div className="ml-3">
                        <Link to={`/profile/${item?.author?._id}`}>
                            <h3 className="text-lg font-semibold">{item?.author?.fullName}</h3>
                        </Link>
                        <p className="text-gray-500">{formatDate(item?.createdAt)}</p>
                    </div>
                </div>
                {/* Post Data (Image and Text) */}
                <div>
                    <p className="text-gray-800">{item?.content}</p>
                    {item?.imageUrl && <img src={item?.imageUrl} alt="Post" className="mt-2 rounded-lg" style={{ width: '100%' }} />}
                </div>
                <Divider className="my-4" />

                {/* Posts Engage Details */}
                <div className="flex flex-col sm:flex-row justify-between items-center ">
                    <div className="flex items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                        {isLiked ? (
                            <Button icon={<HeartFilled />} type="text" onClick={() => handleLike(item._id)}>
                                Liked ({likes.length})
                            </Button>
                        ) : (
                            <Button icon={<HeartOutlined />} type="text" onClick={() => handleLike(item._id)}>
                                Like ({likes.length})
                            </Button>
                        )}
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
                                        <Avatar src={comment?.author?.profilePhoto || "https://via.placeholder.com/150"} className="mr-3" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <Text strong>{comment?.author?.fullName}</Text>
                                                <Text type="secondary">{formatDate(comment?.createdAt)}</Text>
                                            </div>
                                            <Text>{comment?.content}</Text>
                                            {(comment.replies || []).map(reply => (
                                                <div key={reply._id} className="ml-10 mt-4">
                                                    <div className="flex items-start">
                                                        <Avatar src={reply?.author?.profilePhoto || "https://via.placeholder.com/150"} className="mr-3" />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-center">
                                                                <Text strong>{reply?.author?.fullName}</Text>
                                                                <Text type="secondary">{formatDate(reply?.createdAt)}</Text>
                                                            </div>
                                                            <Text>{reply?.content}</Text>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* <Button type="link" onClick={toggleReplyForm}>Reply</Button> */}
                                            {replyFormOpen && (
                                                <Form onFinish={() => handleReplySubmit(comment._id)}>
                                                    <Form.Item>
                                                        <Input.TextArea
                                                            value={replyContent}
                                                            onChange={(e) => setReplyContent(e.target.value)}
                                                            placeholder="Write your reply..."
                                                            rows={2}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit">
                                                            Post Reply
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            )}
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

export default SinglePost;
