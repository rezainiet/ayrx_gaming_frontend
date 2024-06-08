import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
        <Card className="mb-4 shadow-md rounded-lg">
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">People you may know!</h3>
                {randomUsers.map(user => (
                    <div key={user._id} className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Avatar src={user.profilePhoto} size={48} className="mr-3" />
                            <div>
                                <h4 className="text-base font-semibold">{user.fullName}</h4>
                                <p className="text-sm text-gray-500">{user.userTitle}</p>
                            </div>
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="small"
                            onClick={() => handleAddFriend(user._id)}
                        >
                            Add Friend
                        </Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Sidebar;
