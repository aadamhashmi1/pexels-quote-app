// src/components/ImageModal.js
import React, { useEffect } from 'react';
import { Canvas } from 'fabric';
import { Image as FabricImage, Text as FabricText } from 'fabric';

const ImageModal = ({ image, quote, onClose }) => {
    useEffect(() => {
        const canvas = new Canvas('canvas');

        console.log("Image URL:", image.src.large); // Check the URL

        FabricImage.fromURL(image.src.large, (img) => {
            // Ensure the image is loaded
            img.set({
                left: 0,
                top: 0,
                originX: 'left',
                originY: 'top',
            });

            // Resize canvas to match the image dimensions
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);

            // Add image to canvas
            canvas.add(img);

            // Create and add the text overlay
            const text = new FabricText(quote.toUpperCase(), {
                left: canvas.getWidth() / 2,
                top: canvas.getHeight() / 2,
                fontSize: 40,
                fill: '#ffffff',
                originX: 'center',
                originY: 'center',
                textAlign: 'center',
                editable: true, // Allow text editing
                hasControls: true,
                hasBorders: true,
            });

            // Add the text to the canvas
            canvas.add(text);
            canvas.setActiveObject(text);

            // Ensure everything is rendered correctly
            canvas.renderAll();
        }, {
            crossOrigin: 'anonymous', // Handle potential CORS issues
        });

        // Cleanup on component unmount
        return () => {
            canvas.dispose();
        };
    }, [image, quote]);

    // Function to open the image with text in a new window
    const openImageWithTextInNewTab = () => {
        const newWindow = window.open('', '_blank');

        // Create HTML content for the new window
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Image with Text</title>
                <style>
                    body { margin: 0; }
                    canvas { border: 2px solid #fff; display: block; }
                </style>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
            </head>
            <body>
                <canvas id="canvas"></canvas>
                <script>
                    const canvas = new fabric.Canvas('canvas');
                    fabric.Image.fromURL('${image.src.large}', (img) => {
                        img.set({
                            left: 0,
                            top: 0,
                            originX: 'left',
                            originY: 'top',
                        });
                        canvas.setWidth(img.width);
                        canvas.setHeight(img.height);
                        canvas.add(img);
                        
                        const text = new fabric.Text('${quote.toUpperCase()}', {
                            left: canvas.getWidth() / 2,
                            top: canvas.getHeight() / 2,
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
                        canvas.renderAll();
                    }, {
                        crossOrigin: 'anonymous',
                    });
                </script>
            </body>
            </html>
        `;

        newWindow.document.open();
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
            }}
        >
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#fff',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    zIndex: 1,
                }}
            >
                Close
            </button>
            <div
                style={{
                    border: '2px solid #fff',
                    padding: '20px',
                }}
                onClick={openImageWithTextInNewTab} // Open image with text in new tab
            >
                <canvas id="canvas" style={{ border: '2px solid #fff', backgroundColor: '#000' }} />
            </div>
        </div>
    );
};

export default ImageModal;
