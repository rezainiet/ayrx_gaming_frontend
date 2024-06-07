import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Rate, Tag, Button, Form, Input, Skeleton, Alert } from 'antd';
import RelatedGroups from './RelatedGroups/RelatedGroups';
import axios from 'axios';
import CreateGameGroup from './CreateGameGroup/CreateGameGroup';

const { Title, Text } = Typography;

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const getGame = async (id) => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://www.api.onlyhumanity.co.uk/api/v1/games/getGames/${id}`);
                if (res.data) {
                    setGame(res.data);
                } else {
                    setNotFound(true);
                }
            } catch (error) {
                console.error('Error while getting game:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        getGame(id);
    }, [id]);

    if (loading) {
        return <Skeleton active />;
    }

    if (notFound) {
        return (
            <div className="text-center">
                <Alert
                    message="Game Not Found"
                    description="The game you are looking for does not exist."
                    type="error"
                    showIcon
                    className="font-poppins"
                />
            </div>
        );
    }



    return (
        <div className="max-w-4xl mx-auto p-4">
            {game && (
                <>
                    <img src={game.coverPhoto} alt={game.name} className="w-full h-64 object-cover rounded-md shadow-lg mb-4" />
                    <Title level={2} className="font-poppins">{game.name}</Title>
                    <Rate disabled allowHalf defaultValue={game.ratings} className="mb-2" />
                    <div className="mb-2">
                        <Tag key={game.genre} className="font-poppins">{game.genre}</Tag>
                    </div>
                    <Text className="font-poppins">{game.description}</Text>

                    <RelatedGroups relatedGroups={game?.relatedGroups} />

                    <CreateGameGroup
                        gameId={id}
                    />
                </>
            )}
        </div>
    );
};

export default GameDetails;
