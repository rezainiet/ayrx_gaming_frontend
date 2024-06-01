import { useState } from 'react';
import axios from 'axios';

const useImgBBUploader = () => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = async (imageFile) => {
        try {
            setLoading(true);
            const imageData = new FormData();
            imageData.append('image', imageFile);
            axios
            const response = await axios.post('https://api.imgbb.com/1/upload?key=b379cea0ac99373d4d9466d4578912f3', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false, // Set withCredentials to false
            });
            setImageUrl(response.data.data.url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return { loading, imageUrl, uploadImage };
};

export default useImgBBUploader;
