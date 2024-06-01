import React from 'react';
import { Card } from 'antd';

const Sidebar = () => (
    <Card className="mb-4 shadow-md rounded-lg">
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Trending Posts</h3>
            <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/150" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <h4 className="text-sm font-semibold">John Doe</h4>
                    <p className="text-xs text-gray-500">This is a trending post!</p>
                </div>
            </div>
            {/* Repeat the above structure for each suggestion */}
        </div>
    </Card>
);

export default Sidebar;