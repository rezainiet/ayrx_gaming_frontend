import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Alert, Avatar, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';
import useFetchUserData from '../../hooks/useFetchUserData';
import useFriendRequest from '../../hooks/useFriendRequest';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:4000/api/v1/user/search?query=${query}`);
                setResults(response.data);
            } catch (err) {
                setError('Failed to fetch search results');
            }
            setLoading(false);
        };

        fetchData();
    }, [query]);

    return (
        <div className="search-results-container">
            <h2>Search Results for "{query}"</h2>
            {loading && <Spin size="large" className="loading-spinner" />}
            {error && <Alert message="Error" description={error} type="error" showIcon />}
            {!loading && !error && (
                <Row gutter={[16, 16]}>
                    {results.map(userId => (
                        <SearchResultItem key={userId?._id} userId={userId?._id} />
                    ))}
                </Row>
            )}
        </div>
    );
};

const SearchResultItem = ({ userId }) => {
    const { authUser } = useSelector(store => store.user);
    const { user, loading } = useFetchUserData(userId);
    const [isFriend, setIsFriend] = useState(user.isFriend);
    const [isSentRequest, setIsSentRequest] = useState(user.isSentRequest);
    const [isReceivedRequest, setIsReceivedRequest] = useState(user.isReceivedRequest);
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);
    const navigate = useNavigate('');

    const { sendFriendRequest, cancelFriendRequest, acceptFriendRequest, blockUser, unBlockUser } = useFriendRequest(isSentRequest, isReceivedRequest);

    useEffect(() => {
        setIsFriend(user.isFriend);
        setIsSentRequest(user.isSentRequest);
        setIsReceivedRequest(user.isReceivedRequest);
        setIsBlocked(user.isBlocked);
    }, [user]);

    console.log(authUser, userId)


    const handleClickView = (id) => {
        navigate(`/profile/${id}`)
    }

    return (
        <>
            {
                userId !== authUser?._id ? <Col xs={24} sm={12} md={8} lg={6}>
                    <Card
                        hoverable
                        className="search-result-card"
                        actions={[
                            isBlocked ? (
                                <Button onClick={() => unBlockUser(userId)}>Unblock</Button>
                            ) : (
                                isSentRequest ? (
                                    <Button danger onClick={() => cancelFriendRequest(userId)}>Cancel Request</Button>
                                ) : isReceivedRequest ? (
                                    <>
                                        <Button type="primary" onClick={() => acceptFriendRequest(userId)}>Accept</Button>
                                        <Button danger onClick={() => blockUser(userId)}>Block</Button>
                                    </>
                                ) : isFriend ? (
                                    <Button type="primary" disabled
                                    // onClick={() => sendFriendRequest(userId)}
                                    >Already Friend</Button>
                                ) : <Button type="primary"
                                    onClick={() => sendFriendRequest(userId)}
                                >Add Friend</Button>
                            ),
                            // null
                            <Button key={userId} onClick={() => handleClickView(userId)}>View Profile</Button>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={user.profilePhoto} />}
                            title={<a href={`/profile/${user._id}`}>{user.fullName}</a>}
                            description={user.aboutUser}
                        />
                    </Card>
                </Col>
                    :
                    null
            }
        </>
    );
};

export default SearchResults;
