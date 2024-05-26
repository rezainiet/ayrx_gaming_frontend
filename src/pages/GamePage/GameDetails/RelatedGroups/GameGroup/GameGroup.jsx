import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CreatePost from './CreatePost/CreatePost';
import PostsSection from './PostsSection/PostsSection';
import GroupMembers from './GroupMembers/GroupMembers';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const GameGroup = () => {
    const { authUser } = useSelector(store => store.user);
    const { groupId } = useParams();
    const [joined, setJoined] = useState(false);
    const [newPost, setNewPost] = useState("");
    const [newComment, setNewComment] = useState("");
    const [posts, setPosts] = useState(null);
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

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

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:4000/api/v1/groups/getGroup/${groupId}`);
                setGroup(response.data);

                // Check if the current user is a member of the group
                if (authUser && response.data.members.some(member => member._id === authUser._id)) {
                    setJoined(true);
                } else {
                    setJoined(false);
                }
            } catch (error) {
                console.error('Error fetching group:', error);
            }
        };

        if (authUser) {
            fetchGroup();
        }
    }, [groupId, authUser]);

    const handleJoinLeave = async () => {
        try {
            axios.defaults.withCredentials = true;
            if (joined) {
                // Leave group
                await axios.post(`http://localhost:4000/api/v1/groups/${groupId}/leave`, {
                    userId: authUser._id
                });
                setJoined(false);
            } else {
                // Join group
                await axios.post(`http://localhost:4000/api/v1/groups/${groupId}/join`, {
                    userId: authUser._id
                });
                setJoined(true);
            }
        } catch (error) {
            console.error('Error joining/leaving group:', error);
        }
    };


    const handlePost = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`http://localhost:4000/api/v1/posts/${groupId}/createPostInGroup`, {
                content: newPost,
                authorId: authUser._id // Assuming you have the authUser object available
            });
            setNewPost("");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

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
        console.log('Liked');
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
            />
        </div>
    );
};

export default GameGroup;
