import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';

const ImageModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageUrl, quote } = location.state || {};
    
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [textObject, setTextObject] = useState(null);
    const [fontIndex, setFontIndex] = useState(0); // State to keep track of the current font index

    // Memoize the fonts array to prevent unnecessary re-renders
    const fonts = useMemo(() => [
        'Arial',
        'Verdana',
        'Courier New',
        'Georgia',
        'Times New Roman',
        'Comic Sans MS',
        'Trebuchet MS',
        'Helvetica',
    ], []);

    useEffect(() => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current);
        setCanvas(fabricCanvas);
        
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

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
                fabricCanvas.setDimensions({
                    width: imgWidth,
                    height: imgHeight,
                });
                fabricCanvas.add(fabricImg);
            }
        
            const context = fabricCanvas.getContext('2d');
            context.drawImage(imgElement, 0, 0, imgWidth, imgHeight);
            const imageData = context.getImageData(0, 0, imgWidth, imgHeight);
            const data = imageData.data;

            let r, g, b, avg;
            let colorSum = 0;

            for (let x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];

                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }

            const brightness = Math.floor(colorSum / (imgWidth * imgHeight));
            const textColor = brightness > 128 ? '#000000' : '#FFFFFF';
            const text = new fabric.Textbox(quote?.toUpperCase() || '', {
                left: imgWidth / 2,
                top: imgHeight / 2,
                width: imgWidth * 0.9,
                fontSize: 40,
                fill: textColor,
                originX: 'center',
                originY: 'center',
                textAlign: 'center',
                editable: true,
                hasControls: true,
                hasBorders: true,
                wordWrap: true,
                padding: 10,
                cornerSize: 20,
                fontFamily: fonts[fontIndex] // Set initial font
            });

            fabricCanvas.add(text);
            fabricCanvas.setActiveObject(text);
            fabricCanvas.renderAll();
            
            if (typeof text.bringToFront === 'function') {
                text.bringToFront();
            }
            
            setTextObject(text);
        };

        imgElement.onerror = (err) => {
            console.error('Failed to load image:', err);
            spinner.style.display = 'none';
        };

        return () => {
            fabricCanvas.dispose();
        };
    }, [imageUrl, quote, fontIndex, fonts]); // Added fonts and fontIndex to the dependency array

    const handleClose = () => {
        navigate('/');
    };

    const handleDownload = () => {
        if (canvas) {
            const dataURL = canvas.toDataURL({
                format: 'png',
                quality: 1,
            });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'image-with-text.png';
            link.click();
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleChangeColor = () => {
        if (textObject && canvas) {
            const newColor = getRandomColor();
            textObject.set('fill', newColor);
            canvas.renderAll();
        }
    };

    const handleChangeFont = () => {
        if (textObject && canvas) {
            const newFontIndex = (fontIndex + 1) % fonts.length;
            textObject.set('fontFamily', fonts[newFontIndex]);
            setFontIndex(newFontIndex);
            canvas.renderAll();
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
                className="absolute bottom-4 right-16 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
                onClick={handleDownload}
            >
                Download
            </button>
            <button
                className="absolute bottom-16 right-14 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
                onClick={handleChangeColor}
            >
                Change Color
            </button>
            <button
                className="absolute bottom-24 right-24 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
                onClick={handleChangeFont}
            >
                Change Font
            </button>
        </div>
    );
};

export default ImageModal;
