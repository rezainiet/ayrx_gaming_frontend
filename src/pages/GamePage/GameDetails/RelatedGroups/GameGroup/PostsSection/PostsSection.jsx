import { Card, Avatar, Button, Divider, List, Typography } from 'antd';
import { HeartOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

const { Text } = Typography;

const PostsSection = ({ posts }) => {
    const { authUser } = useSelector(store => store.user);

    // Reverse the order of posts to display the newest first
    const reversedPosts = [...posts].reverse();

    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={reversedPosts} // Use reversedPosts here
                renderItem={item => (
                    <List.Item key={item._id}>
                        <SinglePost item={item} authUser={authUser} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PostsSection;
