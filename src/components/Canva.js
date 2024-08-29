import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as fabric from 'fabric';

const Canvas = () => {
  const { state } = useLocation();
  const { imageUrl, text } = state || {}; // Destructuring to get imageUrl and text from state
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    const initCanvas = () => {
      if (imageUrl) {
        fabric.util.loadImage(imageUrl, (imgElement) => {
          if (imgElement) {
            const fabricImg = new fabric.Image(imgElement, {
              left: 0,
              top: 0,
              selectable: false,
              evented: false,
            });

            canvas.setWidth(imgElement.width);
            canvas.setHeight(imgElement.height);

            canvas.add(fabricImg);

            if (text) {
              const textObj = new fabric.Textbox(text.toUpperCase(), { // Changed `quote` to `text`
                left: canvas.width / 2,
                top: canvas.height / 2,
                width: canvas.width * 0.9,
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

              // Log to check if the text object is created
              console.log("Text object created:", textObj);

              // Add the text object to the canvas
              canvas.add(textObj);

              // Log to check if the text object is added to the canvas
              console.log("Text object added to canvas:", canvas.contains(textObj));

              canvas.setActiveObject(textObj);

              const adjustTextSize = () => {
                while (textObj.width > canvas.width * 0.9 || textObj.height > canvas.height * 0.9) {
                  textObj.set({ fontSize: textObj.fontSize - 1 });
                  canvas.renderAll();
                }
              };

              adjustTextSize();
            }
          }
        }, { crossOrigin: 'anonymous' });
      }
    };

    initCanvas();

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, text]);

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
    <div className="min-h-screen bg-gray-100 relative">
      <canvas ref={canvasRef} className="border-2 border-white"></canvas>
      <div className="absolute bottom-4 right-4">
        <button
          className="bg-white border-none px-4 py-2 cursor-pointer z-10 rounded"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Canvas;
