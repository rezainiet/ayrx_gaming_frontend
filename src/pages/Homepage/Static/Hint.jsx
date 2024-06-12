// src/components/Hint.js
import React from 'react';
import { Card, Button, Tooltip } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';

const Hint = ({ userRole }) => {
    return (
        <div className="flex items-center justify-center sm:py-0 md:py-12 rotate-30 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-xl">
            <Card
                className="rounded-lg backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 sm:mx-0 md:mx-3 max-w-4xl rotate-3"
            // style={{ width: 800 }}
            >
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full mr-4"></div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Hi there, 👋</h2>
                    </div>
                </div>
                <p className="text-gray-700 mb-4">
                    Welcome to OnlyHumanity, a place where you can connect, share, and grow with a community that values humanity and creativity. Here’s why you should join us:
                </p>
                <ul className="text-gray-700 mb-4 list-disc list-inside">
                    <li>Engage with a supportive community</li>
                    <li>Access exclusive content and resources</li>
                    <li>Share your ideas and receive feedback</li>
                    <li>Connect with like-minded individuals</li>
                </ul>

                {/* Optional */}
                {/* <div className="flex justify-between items-center">
                    <a href="#" className="text-purple-700">Learn More</a>
                    <div className="flex space-x-2">
                        {userRole !== 'guest' && (
                            <>
                                <Tooltip title="Like">
                                    <Button type="text" icon={<LikeOutlined />} />
                                </Tooltip>
                                <Tooltip title="Comment">
                                    <Button type="text" icon={<CommentOutlined />} />
                                </Tooltip>
                            </>
                        )}
                        <Tooltip title="Share">
                            <Button type="text" icon={<ShareAltOutlined />} />
                        </Tooltip>
                    </div>
                </div> */}
                {userRole === 'admin' && (
                    <div className="mt-4">
                        <Button type="primary">Post New Content</Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Hint;
