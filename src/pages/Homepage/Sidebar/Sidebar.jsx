// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Divider } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
    // State to store user data
    const [randomUsers, setRandomUsers] = useState([]);

    useEffect(() => {
        // Fetch random user data from the API
        const fetchRandomUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URI}/api/v1/user/getRandomUser`);
                const data = await response.json();
                setRandomUsers(data);
            } catch (error) {
                console.error('Failed to fetch random users:', error);
            }
        };

        fetchRandomUsers();
    }, []); // Empty dependency array to run only once on component mount

    // Function to handle adding a user to friends
    const handleAddFriend = (userId) => {
        // Implement functionality to add user to friends list
        console.log(`Added user with ID ${userId} to friends.`);
    };

    return (
        <Card className="mb-4 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-50">
            <div className="sm:p-0 md:p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">People you may know!</h3>
                <Divider className="bg-gray-200" />
                {randomUsers.map(user => (
                    <div key={user._id} className="flex items-center justify-between mb-4 p-3 transition-transform transform hover:scale-105 rounded-lg bg-gradient-to-r from-purple-400 to-blue-400 shadow-md">
                        <div className="flex items-center">
                            <Avatar src={user.profilePhoto} size={48} icon={<UserOutlined />} className="mr-3" />
                            <div>
                                <h4 className="text-lg font-medium text-white">{user.fullName}</h4>
                                <p className="text-sm text-gray-200">{user.userTitle}</p>
                            </div>
                        </div>
                        <div className="add-friend-button-wrapper wi">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlusOutlined />}
                                onClick={() => handleAddFriend(user._id)}
                                className="add-friend-button"
                            />
                            <span className="add-friend-text">Add Friend</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Sidebar;
