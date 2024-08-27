import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';

const App = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [quote, setQuote] = useState('');
    const [generatedQuote, setGeneratedQuote] = useState(''); // New state for the generated quote

    const handleSearch = async (query) => {
        setQuote(query);
        try {
            const response = await axios.get('https://api.pexels.com/v1/search', {
                params: { query, per_page: 15 },
                headers: {
                    Authorization: 'uVktvfZdjycLoNDU8HGlu633wvCVGRKJk7kfxqXrFtBwOpxGVAYNQsbg',
                },
            });
            setImages(response.data.photos);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleGenerateRandomQuote = async () => {
        try {
            const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                headers: { 'X-Api-Key': 'WIDogwrp/Kfc3ELin0zpLg==uPeHtjJU6R6Z3X0Q' }, // Replace with your API key
            });
            const randomQuote = response.data[0].quote; // Adjust based on API response structure
            setGeneratedQuote(randomQuote); // Update the state with the generated quote
            setQuote(randomQuote);
            handleSearch(randomQuote);
        } catch (error) {
            console.error('Error fetching random quote:', error);
        }
    };

    const handleImageClick = (image) => {
        // Set the selected image and quote, so ImageModal can use them
        setSelectedImage(image);
        setQuote(quote); // Make sure to use the correct quote
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <SearchBar
                onSearch={handleSearch}
                onGenerateRandomQuote={handleGenerateRandomQuote} // Pass the function to SearchBar
            />
            {generatedQuote && (
                <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <strong>Generated Quote:</strong> {generatedQuote}
                </div>
            )}
            <ImageGrid images={images} onImageClick={handleImageClick} />
            {selectedImage && (
                <ImageModal image={selectedImage} quote={quote} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;
