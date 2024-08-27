import React, { useState } from 'react';

const SearchBar = ({ onSearch, onGenerateRandomQuote }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query) {
            onSearch(query);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a quote..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={onGenerateRandomQuote}>Generate Random Quote</button>
        </div>
    );
};

export default SearchBar;
