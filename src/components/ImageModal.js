import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';

const ImageModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageUrl, quote } = location.state || {}; // Access the state directly

    useEffect(() => {
        let canvas = null; // Define canvas at the component level

        const initCanvas = () => {
            canvas = new fabric.Canvas('canvas');
            const spinner = document.getElementById('spinner');

            // Ensure spinner is shown while loading
            spinner.style.display = 'block';

            // Create a new image element
            const imgElement = new Image();
            imgElement.crossOrigin = 'anonymous'; // Handle cross-origin images
            imgElement.src = imageUrl;
            imgElement.onload = () => {
                const fabricImg = new fabric.Image(imgElement, {
                    left: 0,
                    top: 0,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,
                    evented: false,
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                });

                const imgWidth = imgElement.width;
                const imgHeight = imgElement.height;

                // Hide the spinner when the image is loaded
                spinner.style.display = 'none';

                // Set canvas size
                canvas.setWidth(imgWidth);
                canvas.setHeight(imgHeight);

                canvas.add(fabricImg);

                // Add text to canvas
                const text = new fabric.Textbox(quote || 'Your Text Here', {
                    left: imgWidth / 2,
                    top: imgHeight / 2,
                    width: imgWidth * 0.9,
                    fontSize: 40,
                    fill: '#ffffff',
                    originX: 'center',
                    originY: 'center',
                    textAlign: 'center',
                    editable: true,
                    hasControls: true,
                    hasBorders: true,
                });

                canvas.add(text);
                canvas.setActiveObject(text);

                // Download button functionality
                document.getElementById('downloadBtn').addEventListener('click', () => {
                    const dataURL = canvas.toDataURL({
                        format: 'png',
                        quality: 1
                    });
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = 'image-with-text.png';
                    link.click();
                });
            };

            imgElement.onerror = (err) => {
                console.error('Failed to load image:', err);
                spinner.style.display = 'none'; // Hide spinner on error
            };
        };

        initCanvas();

        // Cleanup function
        return () => {
            if (canvas) {
                canvas.dispose();
            }
        };

    }, [imageUrl, quote]);

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
            >
                Close
            </button>
            <canvas id="canvas" className="border-2 border-white"></canvas>
            <div className="spinner" id="spinner">Loading...</div>
            <button id="downloadBtn" className="absolute bottom-4 right-4 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded">
                Download
            </button>
        </div>
    );
};

export default ImageModal;
