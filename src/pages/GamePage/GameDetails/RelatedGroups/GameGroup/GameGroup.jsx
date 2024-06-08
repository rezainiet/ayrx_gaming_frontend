import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Input, Upload, Modal, message } from 'antd';
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
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [newCoverPhoto, setNewCoverPhoto] = useState(null);
    const [newGroupName, setNewGroupName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUserData = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user/getUserDetails`);
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
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/groups/getGroup/${groupId}`);
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
                await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/groups/${groupId}/leave`, {
                    userId: authUser._id
                });
                setJoined(false);
            } else {
                // Join group
                await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/groups/${groupId}/join`, {
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
            await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/posts/${groupId}/createPostInGroup`, {
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

    const handleCoverPhotoChange = async (file) => {
        const apiKey = 'b379cea0ac99373d4d9466d4578912f3'; // Replace with your ImgBB API key
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false, // Set withCredentials to false
            });
            setNewCoverPhoto(response.data.data.url);
            message.success('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image');
        }
    };

    const handleGroupUpdate = async () => {
        try {
            axios.defaults.withCredentials = true;
            const updatedGroup = {
                title: newGroupName || group.title,
                coverPhoto: newCoverPhoto || group.coverPhoto
            };
            const response = await axios.put(`${import.meta.env.VITE_API_URI}/api/v1/groups/${groupId}/update`, updatedGroup);
            setGroup(response.data);
            setIsModalOpen(false);
            message.success('Group updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating group:', error);
            message.error('Failed to update group');
        }
    };

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
                    {/* <Avatar src={group.avatarUrl} size={64} className="mr-4" /> */}
                    <div>
                        <Title level={2} className="font-poppins m-0">{group.title}</Title>
                        <Paragraph className="font-poppins mt-1 mb-2 text-gray-600">{group.description}</Paragraph>
                        <Text className="font-poppins text-sm text-gray-500">Author: {group.author.fullName}</Text>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button
                        type={joined ? "default" : "primary"}
                        onClick={handleJoinLeave}
                        className="mt-4 md:mt-0 md:ml-auto"
                    >
                        {joined ? "Leave Group" : "Join Group"}
                    </Button>
                    {authUser && authUser._id === group.author._id && (
                        <Button
                            type="default"
                            onClick={() => setIsModalOpen(true)}
                            className="ml-2"
                        >
                            Edit Group
                        </Button>
                    )}
                </div>
            </div>

            {/* Modal for updating group */}
            <Modal
                title="Update Group"
                open={isModalOpen}
                onOk={handleGroupUpdate}
                onCancel={() => setIsModalOpen(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <Input
                    placeholder="New Group Name"
                    value={newGroupName}
                    onChange={e => setNewGroupName(e.target.value)}
                    className="mb-4"
                />
                <Upload
                    beforeUpload={handleCoverPhotoChange}
                    showUploadList={false}
                >
                    <Button>Change Cover Photo</Button>
                </Upload>
            </Modal>

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
