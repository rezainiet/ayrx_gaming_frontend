import { List } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserRecentPost from './UserRecentPost/UserRecentPost';
import { useParams } from 'react-router-dom';


const UserRecentPosts = () => {
    const { userId } = useParams();
    const { authUser } = useSelector(store => store.user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUsersPosts = async () => {
            try {
                const res = await axios.get(`https://www.api.onlyhumanity.co.uk/api/v1/posts/getPosts/${userId}`);
                // console.log(res.data);
                setPosts(res.data.posts);
            } catch (error) {
                // console.log(error);
            }
        };
        if (userId) {
            getUsersPosts();
        }
    }, [userId]);

    return (
        <div>
            <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={item => (
                    <List.Item key={item._id}>
                        <UserRecentPost item={item} authUser={authUser} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default UserRecentPosts;
