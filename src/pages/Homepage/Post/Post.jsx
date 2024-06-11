import React, { useState } from 'react';
import { Card, Avatar, Divider, Button, Image, Tooltip, Typography } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import CommentSection from '../CommentSection/CommentSection';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const Post = ({ post, onCommentClick }) => {
    const { authUser } = useSelector(store => store.user);
    const [liked, setLiked] = useState(post?.likes?.includes(authUser?._id));
    console.log(post)
    const handleClickLike = async () => {
        try {
            if (liked) {
                // User already liked the post, so remove their like
                const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/forumPosts/${post?._id}/like/${authUser._id}`);
                console.log(response.data);
                // Update liked state to false
                setLiked(false);
            } else {
                // User has not liked the post, so add their like
                const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/forumPosts/${post?._id}/like`, {
                    userId: authUser?._id
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

            {/* Post contents */}
            <div className='post-content'>

                {/* Authors info */}
                <div className="flex items-center mb-2">
                    <Avatar size={64} src={post?.user?.profilePhoto} />
                    <div className="ml-3">
                        <h3 className="text-lg font-semibold">{post?.user?.fullName}</h3>
                        <p className="text-gray-500">{new Date(post?.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Contents */}
                {post.image && <Image src={post?.image} alt={post?.content} className="mt-2 rounded-lg" />}
                <div className='md:mx-5'>
                    <Title level={3} className='font-poppins'>{post?.title}</Title>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

            </div>


            {/* Post Engagement start */}

            <Divider className="my-4" />
            <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                    {/* Check if liked state is true and render appropriate icon */}
                    <Tooltip title='Like'>
                        <Button icon={liked ? <LikeFilled /> : <LikeOutlined />} type="text" onClick={handleClickLike}>
                            {liked ? 'Liked' : 'Like'} ({post.likes?.length})
                        </Button>
                    </Tooltip>
                    <Tooltip title='Comments'>
                        <Button icon={<CommentOutlined />} type="text" onClick={onCommentClick}>
                            Comment ({post.comments.length})
                        </Button>
                    </Tooltip>
                    <Tooltip title='Share'>
                        <Button icon={<ShareAltOutlined />} type="text">
                            Share ({post.shares})
                        </Button>
                    </Tooltip>
                </div>
            </div>


            <Divider />
            {post.showComments && <CommentSection postId={post._id} comments={post.comments} />}
        </Card>
    );
};

export default Post;
