// src/services/forumService.js
import axios from 'axios';

const API_URL = 'https://www.api.onlyhumanity.co.uk/api'; // Change this to your actual backend URL
const IMGBB_API_KEY = 'b379cea0ac99373d4d9466d4578912f3'; // Replace with your ImgBB API key

// User APIs
export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/forumUsers`, userData);
    return response.data;
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/forumUsers`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/forumUsers/${id}`);
    return response.data;
};

// Post APIs
export const createPost = async (postData) => {
    const response = await axios.post(`${API_URL}/forumPosts/createPost`, postData);
    return response.data;
};

export const getPosts = async () => {
    const response = await axios.get(`${API_URL}/forumPosts`);
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/forumPosts/${id}`);
    return response.data;
};

// Comment APIs
export const createComment = async (commentData) => {
    const response = await axios.post(`${API_URL}/forumComments`, commentData);
    return response.data;
};

export const getComments = async () => {
    const response = await axios.get(`${API_URL}/forumComments`);
    return response.data;
};

export const getCommentById = async (id) => {
    const response = await axios.get(`${API_URL}/forumComments/${id}`);
    return response.data;
};

// Reply APIs
export const createReply = async (replyData) => {
    const response = await axios.post(`${API_URL}/forumReplies`, replyData);
    return response.data;
};

export const getReplies = async () => {
    const response = await axios.get(`${API_URL}/forumReplies`);
    return response.data;
};

export const getReplyById = async (id) => {
    const response = await axios.get(`${API_URL}/forumReplies/${id}`);
    return response.data;
};

// ImgBB API
export const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
    return response.data;
};
