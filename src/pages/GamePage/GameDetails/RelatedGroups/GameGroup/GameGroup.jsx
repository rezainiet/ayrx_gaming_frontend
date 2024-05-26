import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, List, Card, Button, Input, Tooltip } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';
import CreatePost from './CreatePost/CreatePost';
import PostsSection from './PostsSection/PostsSection';
import GroupMembers from './GroupMembers/GroupMembers';
import axios from 'axios';


const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const GameGroup = () => {
    const { groupId } = useParams();
    const [joined, setJoined] = useState(false);
    const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");
    const [posts, setPosts] = useState(null);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:4000/api/v1/groups/getGroup/${groupId}`);
                setGroup(response.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };

        fetchGroup();
    }, [groupId]);

    const handleJoinLeave = () => {
        setJoined(!joined);
    };

    const handlePost = () => {
        if (newPost.trim()) {
            const post = {
                id: posts.length + 1,
                author: { id: 104, name: "New User", avatarUrl: "https://via.placeholder.com/50" },
                content: newPost,
                comments: []
            };
            setPosts([post, ...posts]);
            setNewPost("");
        }
    };

    console.log(group)

    const handleComment = (postId) => {
        if (newComment.trim()) {
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, {
                            id: post.comments.length + 1,
                            author: { id: 104, name: "New User", avatarUrl: "https://via.placeholder.com/50" },
                            content: newComment
                        }]
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            setNewComment("");
        }
    };


    const handleLike = (postId) => {
        console.log('Liked')
    }

    if (!group) {
        return <div>Group not found</div>;
    }

    return (
        <div className="mt-0 p-4">
            {/* Cover Photo */}
            <img src={group.coverPhoto} alt={group.title} className="w-full h-64 object-cover rounded-md shadow-lg mb-4" />

            {/* Group Info */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 p-4 bg-white shadow rounded-md">
                <div className="flex items-center mb-4 md:mb-0">
                    <Avatar src={group.avatarUrl} size={64} className="mr-4" />
                    <div>
                        <Title level={2} className="font-poppins m-0">{group.title}</Title>
                        <Paragraph className="font-poppins mt-1 mb-2 text-gray-600">{group.description}</Paragraph>
                        <Text className="font-poppins text-sm text-gray-500">Author: {group.author.fullName}</Text>
                    </div>
                </div>
                <Button
                    type={joined ? "default" : "primary"}
                    onClick={handleJoinLeave}
                    className="mt-4 md:mt-0 md:ml-auto"
                >
                    {joined ? "Leave Group" : "Join Group"}
                </Button>
            </div>
            <div className='mb-5'>
                <GroupMembers Title={Title} group={group} />
            </div>


            {/* New Post */}
            <CreatePost
                joined={joined}
                Title={Title}
                Paragraph={Paragraph}
                TextArea={TextArea}
                Button={Button}
                newPost={newPost}
                setNewPost={setNewPost}
                handlePost={handlePost}
            />


            {/* Posts */}
            <PostsSection
                posts={group?.posts}
                handleLike={handleLike}
                handleComment={handleComment}
                joined={joined}
                newComment={newComment}
                setNewComment={setNewComment}
            />


        </div>
    );
};

export default GameGroup;
