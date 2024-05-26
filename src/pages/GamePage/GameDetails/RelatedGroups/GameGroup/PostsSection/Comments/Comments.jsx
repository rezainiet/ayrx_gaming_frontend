import React from 'react';
import { Avatar, Button, Form, Input, Typography } from 'antd';
import { format } from 'date-fns';

const { Text } = Typography;

const Comments = ({ formatDate, item, activeCommentId, handleReplySubmit, toggleReplyForm, replyFormOpen, replyContent, setReplyContent, mainComment, setMainComment, comments }) => {
    return (
        <div>
            {item?._id === activeCommentId && (
                <div className="bg-gray-100 p-4 rounded-lg">
                    {/* Comments */}
                    {comments.map((comment) => (
                        <div key={comment._id} className="mb-4 border-b pb-4">
                            {/* Individual Comment */}
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
                                    <Button type="link" onClick={toggleReplyForm}>Reply</Button>
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
    );
};

export default Comments;