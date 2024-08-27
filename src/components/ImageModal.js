import React, { useEffect } from 'react';

const ImageModal = ({ image, quote, onClose }) => {
    useEffect(() => {
        const openImageWithTextInNewTab = () => {
            const newWindow = window.open('', '_blank');
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Image with Text</title>
                    <style>
                        body {
                            margin: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #000;
                            overflow: hidden;
                        }
                        canvas {
                            border: 2px solid #fff;
                            display: block;
                        }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
                </head>
                <body>
                    <canvas id="canvas"></canvas>
                    <script>
                        const canvas = new fabric.Canvas('canvas');
                        fabric.Image.fromURL('${image.src.large}', (img) => {
                            const imgWidth = img.width;
                            const imgHeight = img.height;

                            // Set canvas size
                            canvas.setWidth(imgWidth);
                            canvas.setHeight(imgHeight);

                            // Set image properties
                            img.set({
                                left: 0,
                                top: 0,
                                originX: 'left',
                                originY: 'top',
                                selectable: false, // Ensure image is not interactive
                                evented: false,    // Ensure image does not respond to events
                                hasControls: false, // Remove image controls
                                hasBorders: false,  // Remove image borders
                                lockMovementX: true, // Prevent movement in X direction
                                lockMovementY: true  // Prevent movement in Y direction
                            });

                            canvas.add(img);

                            const text = new fabric.Textbox('${quote.toUpperCase()}', {
    left: imgWidth / 2,
    top: imgHeight / 2,
    width: imgWidth * 0.9, // Set a width for the text box to wrap the text
    fontSize: 40,
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    textAlign: 'center',
    editable: true, // Allow text manipulation
    hasControls: true, // Allow text controls
    hasBorders: true,
});


                            canvas.add(text);

                            // Adjust text position to ensure it is within image bounds
                            const adjustTextPosition = () => {
                                const textWidth = text.width;
                                const textHeight = text.height;

                                text.set({
                                    left: Math.min(Math.max(text.left, textWidth / 2), imgWidth - textWidth / 2),
                                    top: Math.min(Math.max(text.top, textHeight / 2), imgHeight - textHeight / 2),
                                });

                                // Ensure text is contained within the image
                                text.set({
                                    left: Math.max(text.left, textWidth / 2),
                                    top: Math.max(text.top, textHeight / 2),
                                });

                                canvas.renderAll();
                            };

                            adjustTextPosition();

                            // Optional: Adjust fontSize to fit text within the image if needed
                            const adjustFontSize = () => {
                                while (text.width > imgWidth * 0.9 || text.height > imgHeight * 0.9) {
                                    const currentFontSize = text.fontSize;
                                    text.set({ fontSize: currentFontSize - 1 });
                                    canvas.renderAll();
                                }
                            };

                            adjustFontSize();
                            canvas.setActiveObject(text);
                        }, {
                            crossOrigin: 'anonymous',
                        }).catch(err => {
                            console.error('Failed to load image:', err);
                        });
                    </script>
                </body>
                </html>
            `;

            newWindow.document.open();
            newWindow.document.write(htmlContent);
            newWindow.document.close();
        };

        // Open image with text in new tab when component mounts
        openImageWithTextInNewTab();

        // Cleanup on component unmount
        return () => {
            // Nothing to cleanup here
        };
    }, [image, quote]);

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
        </div>
    );
};

export default ImageModal;
