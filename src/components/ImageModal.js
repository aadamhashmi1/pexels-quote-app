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
                            border-radius: 0.375rem;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                            font-size: 1rem;
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

                            const adjustTextPosition = () => {
                                const textWidth = text.width;
                                const textHeight = text.height;

                                text.set({
                                    left: Math.min(Math.max(text.left, textWidth / 2), imgWidth - textWidth / 2),
                                    top: Math.min(Math.max(text.top, textHeight / 2), imgHeight - textHeight / 2),
                                });

                                text.set({
                                    left: Math.max(text.left, textWidth / 2),
                                    top: Math.max(text.top, textHeight / 2),
                                });

                                canvas.renderAll();
                            };

                            adjustTextPosition();

                            const adjustFontSize = () => {
                                while (text.width > imgWidth * 0.9 || text.height > imgHeight * 0.9) {
                                    const currentFontSize = text.fontSize;
                                    text.set({ fontSize: currentFontSize - 1 });
                                    canvas.renderAll();
                                }
                            };

                            adjustFontSize();
                            canvas.setActiveObject(text);

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

        openImageWithTextInNewTab();

        return () => {
            // Cleanup
        };
    }, [image, quote]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center overflow-auto">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white text-gray-800 border-none px-4 py-2 rounded-lg shadow-md text-lg hover:bg-gray-200"
            >
                Close
            </button>
        </div>
    );
};

export default ImageModal;
