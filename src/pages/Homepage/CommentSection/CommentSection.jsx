// CommentSection component
import React, { useState } from 'react';
import { Avatar, Button, Input, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CommentSection = ({ comments, postId }) => {
    const [commentContent, setCommentContent] = useState('');
    const [allComments, setComments] = useState(null);
    const { authUser } = useSelector(store => store.user);

    const handleCommentSubmit = async () => {
        try {
            const newComment = {
                _id: Date.now().toString(), // Temporary ID
                user: {
                    _id: authUser._id,
                    fullName: authUser.fullName,
                    profilePhoto: authUser.profilePhoto || "https://via.placeholder.com/150"
                },
                content: commentContent,
                createdAt: new Date().toISOString()
            };

            // Update the UI optimistically
            setCommentContent('');
            comments.push(newComment);

            const response = await axios.post(`http://localhost:4000/api/forumComments/${postId}/comments`, {
                content: commentContent,
                user: authUser._id
            });

            // Update the comments with the server response
            comments.pop(); // Remove the optimistic comment
            setCommentContent('');
            setComments([...comments, response.data.comment]);
            message.success('Comment added successfully!');
        } catch (error) {
            console.error('Error adding comment:', error);
            message.error('Failed to add comment. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            {
                allComments === null ? (
                    comments.map((comment) => (
                        <div key={comment?._id} className="mb-4">
                            <div className="flex items-start">
                                <Avatar size="small" src={comment?.user?.profilePhoto || "https://via.placeholder.com/150"} />
                                <div className="ml-3">
                                    <p className="font-semibold">{comment?.user?.fullName}:</p>
                                    <p>{comment?.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    allComments.map((comment) => (
                        <div key={comment?._id} className="mb-4">
                            <div className="flex items-start">
                                <Avatar size="small" src={comment?.user?.profilePhoto || "https://via.placeholder.com/150"} />
                                <div className="ml-3">
                                    <p className="font-semibold">{comment?.user?.fullName}:</p>
                                    <p>{comment?.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
            <Input.TextArea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write your comment..."
                className="mb-2"
            />
            <Button type="primary" onClick={handleCommentSubmit}>
                Add Comment
            </Button>
        </div>
    );

};

export default CommentSection;
