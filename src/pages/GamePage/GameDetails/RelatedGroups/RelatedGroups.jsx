import { List, Typography, Input, Avatar, Spin, Button, Alert } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const RelatedGroups = ({ game }) => {
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (game?.groups) {
            setFilteredGroups(game.groups);
            setLoading(false);
        }
    }, [game]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term) {
            const filtered = game.groups.filter(group => group.name.toLowerCase().includes(term.toLowerCase()));
            setFilteredGroups(filtered);
        } else {
            setFilteredGroups(game.groups);
        }
    };

    return (
        <>
            {
                game?.group ? (
                    <div className="mt-8">
                        <Title level={4} className="font-poppins">Related Groups</Title>
                        <Search
                            placeholder="Search groups"
                            onSearch={handleSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                            value={searchTerm}
                            className="mb-4"
                        />
                        {loading ? (
                            <Spin size="large" />
                        ) : (
                            <List
                                bordered
                                dataSource={filteredGroups}
                                renderItem={group => (
                                    <List.Item key={group?.id} className="flex flex-col md:flex-row items-start md:items-center">
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <Avatar src={group?.avatarUrl} className="mr-4" />
                                            <div>
                                                <Text className="font-poppins text-lg">{group?.name}</Text>
                                                <Paragraph className="font-poppins text-sm text-gray-500">
                                                    {group?.description}
                                                </Paragraph>
                                                <Text className="font-poppins text-sm text-gray-500">
                                                    Author: {group?.author}
                                                </Text>
                                            </div>
                                        </div>
                                        <div className="md:ml-auto">
                                            <Button type="link" className="font-poppins">
                                                <Link to={`/game/groups/${group?.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </List.Item>
                                )}
                                className="mb-4"
                            />
                        )}
                    </div>
                ) : (

                    <div className="text-center">
                        <Alert
                            message="Related groups not found!"
                            description="The groups you are looking for does not exist."
                            type="error"
                            showIcon
                            className="font-poppins"
                        />
                    </div>

                )
            }
        </>
    );
};

export default RelatedGroups;
