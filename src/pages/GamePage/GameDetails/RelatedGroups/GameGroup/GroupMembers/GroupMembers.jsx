import React from 'react'

const GroupMembers = ({ Title }) => {
    return (
        <div>
            {/* Members */}
            <Title level={4} className="font-poppins mt-8 ml-5">Group Members!</Title>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse ml-5">
                <div className="avatar">
                    <div className="w-12">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
            {/* <List
                bordered
                dataSource={group.members}
                renderItem={member => (
                    <List.Item className="p-2">
                        <Avatar src={member.avatarUrl} size={32} className="mr-2" />
                        <Text className="font-poppins">{member.name}</Text>
                    </List.Item>
                )}
                className="mt-4"
            /> */}
        </div>
    )
}

export default GroupMembers