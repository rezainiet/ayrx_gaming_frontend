import React from 'react'

const GroupMembers = ({ Title, group }) => {
    // console.log(group)
    return (
        <div>
            {/* Members */}
            <Title level={4} className="font-poppins mt-8 ml-5">Group Members!</Title>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse ml-5">
                {
                    group && group?.members?.length > 0 && group?.members?.map(member => (
                        <div className="avatar" key={member._id}> {/* Ensure a unique key */}
                            <div className="w-12">
                                {console.log(member)}
                                <img src={member.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} /> {/* Use member's profilePhoto if available */}
                            </div>
                        </div>
                    ))
                }
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