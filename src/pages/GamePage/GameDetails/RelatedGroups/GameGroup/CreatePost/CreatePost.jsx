// CreatePost.js

import React from 'react';

const CreatePost = ({ joined, Title, Paragraph, TextArea, Button, newPost, setNewPost, handlePost }) => {
    return (
        <>
            {joined && (
                <div className="mb-6 p-4 bg-white shadow rounded-md">
                    <Title level={4} className="font-poppins mb-2">Create a New Post</Title>
                    <Paragraph className="font-poppins text-sm text-gray-600 mb-4">
                        Share your thoughts, experiences, or questions with the group. Your post will be visible to all members.
                    </Paragraph>
                    <TextArea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows={4}
                        placeholder="What's on your mind?"
                        className="mb-4"
                    />
                    <Button type="primary" onClick={handlePost} className="w-full md:w-auto">
                        Post
                    </Button>
                </div>
            )}
        </>
    );
};

export default CreatePost;
