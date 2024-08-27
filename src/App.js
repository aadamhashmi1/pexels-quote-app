// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';

const App = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quote, setQuote] = useState('');

    const handleSearch = async (query) => {
        setQuote(query);
        const response = await axios.get('https://api.pexels.com/v1/search', {
            params: { query, per_page: 15 },
            headers: {
                Authorization: 'uVktvfZdjycLoNDU8HGlu633wvCVGRKJk7kfxqXrFtBwOpxGVAYNQsbg',
            },
        });
        setImages(response.data.photos);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <ImageGrid images={images} onImageClick={handleImageClick} />
            {selectedImage && (
                <ImageModal image={selectedImage} quote={quote} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;
