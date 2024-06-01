import React from 'react';
import { Card, Table, Tag } from 'antd';

const PaymentHistory = ({ data, columns }) => (
    <Card title="Transaction History" className='mb-5 font-semibold'>
        <div style={{ overflowX: 'auto' }}>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />
        </div>
    </Card>
);

export default PaymentHistory;
