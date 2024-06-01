import React from 'react';
import { Typography, Avatar } from 'antd';

const { Title, Text } = Typography;

const GroupMembers = ({ group }) => {
    const maxVisibleMembers = 20;

    return (
        <div>
            {/* Members */}
            <Title level={4} className="font-poppins mt-8 ml-5">Group Members!</Title>
            <Title level={5} className="font-poppins ml-5">{group?.members?.length} Members</Title>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse ml-5">
                {
                    group && group.members.length > 0 && group.members.slice(0, maxVisibleMembers).map(member => (
                        <div className="avatar" key={member._id}> {/* Ensure a unique key */}
                            <div className="w-12">
                                <img src={member.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={member.name} /> {/* Use member's profilePhoto if available */}
                            </div>
                        </div>
                    ))
                }
                {group && group.members.length > maxVisibleMembers && (
                    <div className="avatar placeholder">
                        <div className="w-12 flex items-center justify-center bg-gray-200 text-gray-800 rounded-full">
                            +{group.members.length - maxVisibleMembers}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupMembers;
