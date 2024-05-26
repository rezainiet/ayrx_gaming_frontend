import { List, Typography, Input, Avatar, Button, Alert } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const RelatedGroups = ({ relatedGroups }) => {
    const [filteredGroups, setFilteredGroups] = useState(relatedGroups);
    const [searchTerm, setSearchTerm] = useState('');
    // console.log(relatedGroups)

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term) {
            const filtered = relatedGroups.filter(group => group.group.title.toLowerCase().includes(term.toLowerCase()));
            setFilteredGroups(filtered);
        } else {
            setFilteredGroups(relatedGroups);
        }
    };

    return (
        <div className="mt-8">
            <Title level={4} className="font-poppins">Related Groups</Title>
            <Search
                placeholder="Search groups"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                value={searchTerm}
                className="mb-4"
            />
            {filteredGroups.length > 0 ? (
                <List
                    bordered
                    dataSource={filteredGroups}
                    renderItem={item => (
                        <List.Item key={item.group?._id}>
                            <div className="flex items-center">
                                <Avatar src={item.group?.coverPhoto} className="mr-4" />
                                <div>
                                    <Text className="font-poppins text-lg">{item.group?.title}</Text>
                                    <Paragraph className="font-poppins text-sm text-gray-500">
                                        {item.group?.description}
                                    </Paragraph>
                                    <Text className="font-poppins text-sm text-gray-500">
                                        Author: <span>
                                            <Link to={`/profile/${item?.group?.author?._id}`} >{item.group?.author?.fullName}</Link>
                                        </span>
                                    </Text>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <Button type="link">
                                    <Link to={`/game/groups/${item.group?._id}`}>View</Link>
                                </Button>
                            </div>
                        </List.Item>
                    )}
                    className="mb-4"
                />
            ) : (
                <div className="text-center">
                    <Alert
                        message="Related groups not found!"
                        description="The groups you are looking for do not exist."
                        type="error"
                        showIcon
                        className="font-poppins"
                    />
                </div>
            )}
        </div>
    );
};

export default RelatedGroups;
