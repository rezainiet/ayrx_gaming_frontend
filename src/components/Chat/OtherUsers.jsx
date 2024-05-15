import React from 'react';
import { List, Avatar } from 'antd';
import useGetOtherUsers from '../../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import OtherUser from '../../components/Chat/OtherUser'

const OtherUsers = () => {
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);

    if (!otherUsers) return null;

    return (
        <div className="overflow-auto flex-1">
            <List
                dataSource={otherUsers}
                renderItem={user => (
                    <OtherUser user={user} key={user?._id} />
                )}
            />
        </div>
    );
};

export default OtherUsers;
