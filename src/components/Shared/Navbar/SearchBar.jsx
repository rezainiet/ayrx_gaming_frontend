import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, isMobile }) => {
    return (
        <div className={`${isMobile ? '' : 'search-bar'} ${isMobile ? 'w-full' : 'w-4/12 ml-5'}`}>
            <Search
                placeholder="Search a friend name..."
                onSearch={handleSearch}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-3"
                prefix={<SearchOutlined />}
                size="large"
            />
        </div>
    );
};

export default SearchBar;
