import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';

const ImageModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageUrl, quote } = location.state || {};

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        const spinner = document.getElementById('spinner');

        spinner.style.display = 'block';

        // Log the quote to check if it's correctly passed
        console.log('Received quote:', quote);

        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = imageUrl;

        imgElement.onload = () => {
            const fabricImg = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                originX: 'left',
                originY: 'top',
                selectable: false,
                evented: false,
            });

            const imgWidth = imgElement.width;
            const imgHeight = imgElement.height;

            spinner.style.display = 'none';

            if (imgWidth && imgHeight) {
                // Use setDimensions to set both width and height
                canvas.setDimensions({
                    width: imgWidth,
                    height: imgHeight,
                });
                canvas.add(fabricImg);
            }
        

            // Ensure quote is used instead of default text
            const text = new fabric.Textbox(quote?.toUpperCase() || '', {
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
                wordWrap: true,
                padding: 10,
                cornerSize: 20,
            });

            canvas.add(text);
            canvas.setActiveObject(text);
            canvas.renderAll();

            if (typeof text.bringToFront === 'function') {
                text.bringToFront();
            }
        
        };

        imgElement.onerror = (err) => {
            console.error('Failed to load image:', err);
            spinner.style.display = 'none';
        };

        return () => {
            canvas.dispose();
        };
    }, [imageUrl, quote]);

    const handleClose = () => {
        navigate('/');
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            const dataURL = canvasRef.current.toDataURL({
                format: 'png',
                quality: 1,
            });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'image-with-text.png';
            link.click();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
            >
                Close
            </button>
            <canvas ref={canvasRef} className="border-2 border-white"></canvas>
            <div className="spinner" id="spinner">Loading...</div>
            <button
                className="absolute bottom-4 right-4 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
                onClick={handleDownload}
            >
                Download
            </button>
        </div>
    );
};

export default ImageModal;
