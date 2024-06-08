import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Typography, Rate, Tag, Input } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const GamePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/games/getGames`);
                if (res.data) {
                    setGames(res.data);
                } else {
                    console.log('Cannot get games, server error');
                }
            } catch (error) {
                console.error('Error while getting games:', error);
            }
        };
        getGames();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (game.genre && game.genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto p-4">
            <Title level={2} className="font-poppins text-center mb-8">Discover Exciting Games</Title>
            <Paragraph className="font-poppins text-center mb-8">
                Welcome to our game collection! Browse through our list of exciting games, find your favorites, and dive into an immersive experience.
            </Paragraph>
            <div className="mb-8">
                <Search
                    placeholder="Search games"
                    enterButton
                    onSearch={handleSearch}
                    className="font-poppins"
                />
            </div>
            <Row gutter={[16, 16]}>
                {filteredGames.map(game => (
                    <Col key={game._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={game.name} src={game.coverPhoto} className="h-48 w-full object-cover" />}
                            className="rounded-md overflow-hidden shadow-lg"
                        >
                            <Title level={4} className="font-poppins">{game.name}</Title>
                            <Rate disabled allowHalf defaultValue={game.ratings} className="mb-2" />
                            <div className="mb-2">
                                <Tag className="font-poppins">{game.genre}</Tag>
                            </div>
                            <Text className="font-poppins">{game.description}</Text>
                            <div className="mt-4 text-center">
                                <Link to={`/game/${game._id}`}>
                                    <Button type="primary" icon={<RightOutlined />} className="font-poppins w-full">Continue</Button>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default GamePage;
