// src/components/ImageGrid.js
import React from 'react';

const ImageGrid = ({ images, onImageClick }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
            {images.map((image) => (
                <img
                    key={image.id}
                    src={image.src.medium}
                    alt={image.alt}
                    style={{ cursor: 'pointer', width: '100%' }}
                    onClick={() => onImageClick(image)}
                />
            ))}
        </div>
    );
};

export default ImageGrid;
