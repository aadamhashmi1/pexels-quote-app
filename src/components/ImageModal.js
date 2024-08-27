import React, { useEffect } from 'react';

const ImageModal = ({ image, quote, onClose }) => {
    useEffect(() => {
        let newWindow = null;
        
        const openImageWithTextInNewTab = () => {
            if (newWindow && !newWindow.closed) {
                // If a window is already open, focus it
                newWindow.focus();
                return;
            }

            newWindow = window.open('', '_blank');
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
                            position: relative;
                        }
                        canvas {
                            border: 2px solid #fff;
                            display: block;
                        }
                        .button-container {
                            position: absolute;
                            top: 10px;
                            right: 10px;
                            z-index: 1;
                        }
                        .button {
                            background-color: #fff;
                            border: none;
                            padding: 10px;
                            cursor: pointer;
                            margin-right: 10px;
                        }
                        .spinner {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            border: 4px solid rgba(0, 0, 0, 0.1);
                            border-left: 4px solid #fff;
                            border-radius: 50%;
                            width: 40px;
                            height: 40px;
                            animation: spin 1s linear infinite;
                        }
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
                </head>
                <body>
                    <canvas id="canvas"></canvas>
                    <div class="button-container">
                        <button class="button" id="downloadBtn">Download</button>
                        <button class="button" id="closeBtn">Close</button>
                    </div>
                    <div class="spinner" id="spinner"></div>
                    <script>
                        const canvas = new fabric.Canvas('canvas');
                        const spinner = document.getElementById('spinner');

                        fabric.Image.fromURL('${image.src.large}', (img) => {
                            const imgWidth = img.width;
                            const imgHeight = img.height;

                            // Hide the spinner when image is loaded
                            spinner.style.display = 'none';

                            // Set canvas size
                            canvas.setWidth(imgWidth);
                            canvas.setHeight(imgHeight);

                            // Set image properties
                            img.set({
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

                            canvas.add(img);

                            const text = new fabric.Textbox('"${quote.toUpperCase()}"', {
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

                            // Close button functionality
                            document.getElementById('closeBtn').addEventListener('click', () => {
                                window.close();
                            });
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
            if (newWindow && !newWindow.closed) {
                newWindow.close();
            }
        };
    }, [image, quote]);

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center overflow-auto"
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
            >
                Close
            </button>
        </div>
    );
};

export default ImageModal;
