import React, { useState } from 'react';
import { Card, Avatar, Divider, Button } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import CommentSection from '../CommentSection/CommentSection';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Post = ({ post, onCommentClick }) => {
    const { authUser } = useSelector(store => store.user);
    const [liked, setLiked] = useState(post?.likes?.includes(authUser?._id));

    const handleClickLike = async () => {
        try {
            if (liked) {
                // User already liked the post, so remove their like
                const response = await axios.delete(`https://www.api.onlyhumanity.co.uk/api/forumPosts/${post._id}/like/${authUser._id}`);
                console.log(response.data);
                // Update liked state to false
                setLiked(false);
            } else {
                // User has not liked the post, so add their like
                const response = await axios.post(`https://www.api.onlyhumanity.co.uk/api/forumPosts/${post._id}/like`, {
                    userId: authUser._id
                });
                console.log(response.data);
                // Update liked state to true
                setLiked(true);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };


    return (
        <Card key={post._id} className="mb-4" bordered={false}>
            <div className="flex items-center mb-2">
                <Avatar size={64} src={post.user.profilePhoto} />
                <div className="ml-3">
                    <h3 className="text-lg font-semibold">{post.user.fullName}</h3>
                    <p className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {post.image && <img src={post.image} alt="Post" className="mt-2 rounded-lg" />}
            <Divider className="my-4" />
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    {/* Check if liked state is true and render appropriate icon */}
                    <Button icon={liked ? <LikeFilled /> : <LikeOutlined />} type="text" onClick={handleClickLike}>
                        {liked ? 'Liked' : 'Like'} ({post.likes?.length})
                    </Button>
                    <Button icon={<CommentOutlined />} type="text" onClick={onCommentClick}>
                        Comment ({post.comments.length})
                    </Button>
                    <Button icon={<ShareAltOutlined />} type="text">
                        Share ({post.shares})
                    </Button>
                </div>
            </div>
            <Divider />
            {post.showComments && <CommentSection postId={post._id} comments={post.comments} />}
        </Card>
    );
};

export default Post;
