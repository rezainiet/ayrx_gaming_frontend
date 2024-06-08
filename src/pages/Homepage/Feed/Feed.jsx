// Feed component
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../Post/Post";

const Feed = () => {
    const [feedData, setFeedData] = useState([]);

    const newFeedData = [...feedData].reverse();
    useEffect(() => {
        const fetchForumPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/forumPosts/getPost`);
                // Initialize showComments property for each post
                const postsWithShowComments = response.data.map(post => ({ ...post, showComments: false }));
                setFeedData(postsWithShowComments);
            } catch (error) {
                console.error('Error fetching forum posts:', error);
            }
        };

        fetchForumPosts();
    }, []);

    const handleCommentClick = (postId) => {
        setFeedData(prevData =>
            prevData.map(post => ({
                ...post,
                showComments: post._id === postId ? !post.showComments : post.showComments
            }))
        );
    };

    return (
        <>
            {newFeedData.map((post) => (
                <Post key={post._id} post={post} onCommentClick={() => handleCommentClick(post._id)} />
            ))}
        </>
    );
};

export default Feed;
