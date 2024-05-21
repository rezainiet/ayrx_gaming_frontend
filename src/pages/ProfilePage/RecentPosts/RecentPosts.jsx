import { Divider, List, Typography } from 'antd'
import React from 'react'
import { HeartOutlined } from "@ant-design/icons"

const { Title, Text } = Typography;


const RecentPosts = ({ posts }) => {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="#">{item.content}</a>}
                            description={
                                <div>
                                    <HeartOutlined style={{ marginRight: '8px' }} />
                                    {item.likes} Likes
                                    <Divider type="vertical" />
                                    <Text className='font-poppins'>{item.comments} Comments</Text>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default RecentPosts