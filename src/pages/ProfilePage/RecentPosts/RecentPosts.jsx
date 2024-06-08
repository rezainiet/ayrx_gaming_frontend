import { Card, Avatar, Button, Divider, List, Typography } from 'antd';
import { HeartOutlined, CommentOutlined, ShareAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RecentPost from './RecentPost';

const { Text } = Typography;

const RecentPosts = () => {
    const { authUser } = useSelector(store => store.user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUsersPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/posts/getPosts/${authUser?._id}`);
                // console.log(res.data);
                setPosts(res.data.posts);
            } catch (error) {
                // console.log(error);
            }
        };
        if (authUser?._id) {
            getUsersPosts();
        }
    }, [authUser?._id]);


    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={item => (
                    <List.Item key={item._id}>
                        <RecentPost item={item} authUser={authUser} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RecentPosts;
