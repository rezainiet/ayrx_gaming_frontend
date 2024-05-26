import { Card, Avatar, Button, Divider, List, Typography } from 'antd';
import { HeartOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

const { Text } = Typography;

const PostsSection = ({ posts }) => {
    const { authUser } = useSelector(store => store.user);
    console.log(posts)

    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={posts}
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
